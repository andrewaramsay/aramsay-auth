import { TimeoutAdapter } from 'aramsay-framework';
import { Moment } from 'moment';
import { Bcrypt, Jwt } from '../util';
import { UsersRepository } from '../data/repositories/users.repository';
import { User } from './models/user';
import { AuthCallback, Token } from './types';
export interface AuthenticationConfig {
    failedAttemptsWhenUserNotFound: number;
    loginFailedSlowdownFactor: number;
    loginFailedMaxWaitTime: number;
    localTokenSecret: string;
    tokenDurationInSeconds: number;
}
export declare class AuthenticationService {
    private options;
    private usersRepository;
    private moment;
    private jwt;
    private bcrypt;
    private timeout;
    constructor(options: AuthenticationConfig, usersRepository: UsersRepository, moment: () => Moment, jwt: Jwt, bcrypt: Bcrypt, timeout: TimeoutAdapter);
    authenticateUser(username: string, password: string, callback: AuthCallback<User>): void;
    private saveUser(user, callback, response, authError?);
    private saveFailedLoginAttempts(user, callback);
    private delayLoginFailedResponse(failedAttempts, callback);
    getUserByToken(token: string, callback: AuthCallback<User>): void;
    private decode(token, callback);
    createToken(iss: string, sub: string): Token;
}
