import { NodeCallback, MomentAdapter, TimeoutAdapter } from 'aramsay-framework';
import { Injectable } from 'aramsay-injector';

import { BcryptAdapter, JwtAdapter } from '../util';
import { UsersRepository } from '../data/repositories/users.repository';
import { User } from './models/user';
import { AuthCallback, Token, TokenPayload } from './types';

const MILLISECONDS = 1000;

export interface AuthenticationConfig {
    failedAttemptsWhenUserNotFound: number;
    loginFailedSlowdownFactor: number;
    loginFailedMaxWaitTime: number;
    localTokenSecret: string;
    tokenDurationInSeconds: number;
}

@Injectable()
export class AuthenticationService {
    constructor(
        private options: AuthenticationConfig,
        private usersRepository: UsersRepository,
        private moment: MomentAdapter,
        private jwt: JwtAdapter,
        private bcrypt: BcryptAdapter,
        private timeout: TimeoutAdapter) {
    }

    authenticateUser(username: string, password: string, callback: AuthCallback<User>): void {
        this.usersRepository.findUserByUsername(username, (err, user) => {
            if (err) {
                return callback(err);
            }

            if (!user) {
                return this.delayLoginFailedResponse(this.options.failedAttemptsWhenUserNotFound, callback);
            }

            this.bcrypt.compare(password, user.passwordHash, (compareErr, isMatch) => {
                if (compareErr) {
                    return callback(compareErr);
                }

                if (isMatch) {
                    user.loginAttempts = 0;
                    this.saveUser(user, callback, user);
                } else {
                    user.loginAttempts += 1;
                    this.saveFailedLoginAttempts(user, callback);
                }
            });
        });
    }

    private saveUser(user: User, callback: AuthCallback<User>, response: User, authError?: Error): void {
        this.usersRepository.saveUser(user, err => {
            if (err) {
                return callback(err);
            }

            callback(null, response, authError);
        });
    }

    private saveFailedLoginAttempts(user: User, callback: AuthCallback<User>): void {
        this.delayLoginFailedResponse(user.loginAttempts, (err, userResponse, authError) => {
            if (err) {
                return callback(err);
            }

            this.saveUser(user, callback, userResponse, authError);
        });
    }

    private delayLoginFailedResponse(failedAttempts: number, callback: AuthCallback<User>): void {
        let calculatedWaitTime = Math.pow(this.options.loginFailedSlowdownFactor, failedAttempts);
        let waitTimeSeconds = Math.min(calculatedWaitTime, this.options.loginFailedMaxWaitTime);

        this.timeout.setTimeout(() => {
            callback(null, null, new Error('Invalid Username/Password, or account is locked.'));
        }, waitTimeSeconds * MILLISECONDS);
    }

    getUserByToken(token: string, callback: AuthCallback<User>): void {
        this.decode(token, (err, payload, authErr) => {
            if (err || authErr) {
                return callback(err, null, authErr);
            }

            if (this.moment.now().unix() > payload.exp) {
                return callback(null, null, new Error('Token Expired'));
            }

            let userId = payload.sub;
            this.usersRepository.findUserById(userId, callback);
        });
    }

    private decode(token: string, callback: AuthCallback<TokenPayload>): void {
        let payload: TokenPayload = null;
        try {
            payload = this.jwt.decode(token, this.options.localTokenSecret);
            return callback(null, payload);
        } catch (err) {
            if (err.message === 'Signature verification failed') {
                return callback(null, null, err);
            }
            return callback(err);
        }
    }

    createToken(iss: string, sub: string): Token {
        let exp = this.moment.now().unix() + this.options.tokenDurationInSeconds;

        let payload: TokenPayload = {
            iss,
            sub,
            exp
        };
        return {
            token: this.jwt.encode(payload, this.options.localTokenSecret),
            exp
        };
    }
}
