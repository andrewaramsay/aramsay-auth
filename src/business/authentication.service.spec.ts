/// <reference path="../../typings/index.d.ts" />
import { TimeoutAdapter, spy, callCallback } from 'aramsay-framework';
import { Moment } from 'moment';
import Spy = jasmine.Spy;

import { Bcrypt, Jwt } from '../util';
import { AuthenticationService, AuthenticationConfig } from './authentication.service';
import { UsersRepository } from '../data/repositories/users.repository';
import { User } from './models/user';

describe('AuthenticationService', () => {
    let target: AuthenticationService;
    let options: AuthenticationConfig;
    let usersRepository: UsersRepository;
    let moment: () => Moment;
    let jwt: Jwt;
    let bcrypt: Bcrypt;
    let timeout: TimeoutAdapter;

    let now: Moment;
    
    beforeEach(() => {
        options = <AuthenticationConfig>{};
        usersRepository = jasmine.createSpyObj<UsersRepository>('usersRepository', ['findUserByUsername', 'findUserById', 'saveUser']);
        moment = jasmine.createSpy('moment');
        now = jasmine.createSpyObj<Moment>('now', ['unix']);
        jwt = jasmine.createSpyObj<Jwt>('jwt', ['encode', 'decode']);
        bcrypt = jasmine.createSpyObj<Bcrypt>('bcrypt', ['compare']);
        timeout = jasmine.createSpyObj<TimeoutAdapter>('timeout', ['setTimeout']);
        
        target = new AuthenticationService(
            options,
            usersRepository, 
            moment,
            jwt,
            bcrypt,
            timeout);

        spy(moment).and.returnValue(now);
    });
    
    it('is injectable', () => {
        expect(Reflect.getMetadata('design:paramtypes', AuthenticationService)).toBeTruthy('no metadata');
    });
    
    describe('authenticateUser', () => {
        let callback: Spy;

        beforeEach(() => {
            callback = jasmine.createSpy('callback');
        });
        
        it('calls findUserByUsername with the username', () => {
            target.authenticateUser('a user', '', callback);
            
            expect(usersRepository.findUserByUsername).toHaveBeenCalledWith('a user', jasmine.anything());
        });

        it('returns any error returned by findUserByUsername', () => {
            let err = new Error('broken');
            spy(usersRepository.findUserByUsername).and.callFake(callCallback(1, err));

            target.authenticateUser('','', callback);
            
            expect(callback).toHaveBeenCalledWith(err);
        });

        it('waits a fake wait time when the username is not found', () => {
            options.loginFailedSlowdownFactor = 2;
            options.failedAttemptsWhenUserNotFound = 5;
            options.loginFailedMaxWaitTime = Infinity;
            let expectedWaitTime = 32000; // 2 ^ 5 seconds, times 1000 for milliseconds
            
            spy(usersRepository.findUserByUsername).and.callFake(callCallback(1, null, null));

            target.authenticateUser('', '', callback);

            expect(timeout.setTimeout).toHaveBeenCalledWith(jasmine.anything(), expectedWaitTime);
        });

        it('returns an auth error when the username is not found', () => {
            spy(usersRepository.findUserByUsername).and.callFake(callCallback(1, null, null));
            spy(timeout.setTimeout).and.callFake(callCallback(0));

            target.authenticateUser('', '', callback);

            expect(callback).toHaveBeenCalledWith(null, null, new Error('Invalid Username/Password, or account is locked.'));
        });

        describe('when user is found', () => {
            let user: User;

            beforeEach(() => {
                user = <User>{};
                
                spy(usersRepository.findUserByUsername).and.callFake(callCallback(1, null, user));
            });

            it('calls bcrypt.compare to validate the password with the user password', () => {
                user.passwordHash = 'password hash';
                
                target.authenticateUser('user', 'supplied password', callback);

                expect(bcrypt.compare).toHaveBeenCalledWith('supplied password', 'password hash', jasmine.anything());
            });

            it('returns errors that occurred during bcrypt.compare', () => {
                let err = new Error('bcrypt broken');
                spy(bcrypt.compare).and.callFake(callCallback(2, err));

                target.authenticateUser('', '', callback);

                expect(callback).toHaveBeenCalledWith(err);
            });

            it('waits the appropriate amount of time for a failed attempt', () => {
                spy(bcrypt.compare).and.callFake(callCallback(2, null, false));
                options.loginFailedSlowdownFactor = 2;
                options.loginFailedMaxWaitTime = Infinity;
                user.loginAttempts = 3; // will increment to 4 before getting to math
                let expectedWaitTime = 16000; // 2 ^ 4 seconds, times 1000 for milliseconds

                target.authenticateUser('', '', callback);

                expect(timeout.setTimeout).toHaveBeenCalledWith(jasmine.anything(), expectedWaitTime);
            });

            it('waits the configured max wait time when the number of failed attempts is too high', () => {
                spy(bcrypt.compare).and.callFake(callCallback(2, null, false));
                options.loginFailedSlowdownFactor = 2;
                options.loginFailedMaxWaitTime = 10; // seconds
                user.loginAttempts = 3; // will increment to 4 before getting to math
                let expectedWaitTime = 10000; // math comes to 16,000, max time limits it to 10,000

                target.authenticateUser('', '', callback);

                expect(timeout.setTimeout).toHaveBeenCalledWith(jasmine.anything(), expectedWaitTime);
            });

            it('saves the user with the incremented loginAttempts', () => {
                spy(bcrypt.compare).and.callFake(callCallback(2, null, false));
                spy(timeout.setTimeout).and.callFake(callCallback(0));
                user.loginAttempts = 3;

                target.authenticateUser('', '', callback);

                expect(usersRepository.saveUser).toHaveBeenCalledWith(jasmine.objectContaining({ loginAttempts: 4 }), jasmine.anything());
            });

            it('calls the callback with an auth error for a failed attempt', () => {
                spy(bcrypt.compare).and.callFake(callCallback(2, null, false));
                spy(timeout.setTimeout).and.callFake(callCallback(0));
                spy(usersRepository.saveUser).and.callFake(callCallback(1))

                target.authenticateUser('', '', callback);

                expect(callback).toHaveBeenCalledWith(null, null, new Error('Invalid Username/Password, or account is locked.'));
            });

            it('saves the user with zero loginAttempts on successful login', () => {
                spy(bcrypt.compare).and.callFake(callCallback(2, null, true));
                user.loginAttempts = 4;

                target.authenticateUser('', '', callback);

                expect(usersRepository.saveUser).toHaveBeenCalledWith(jasmine.objectContaining({ loginAttempts: 0 }), jasmine.anything());
            });

            it('returns the user on successful login', () => {
                spy(bcrypt.compare).and.callFake(callCallback(2, null, true));
                spy(usersRepository.saveUser).and.callFake(callCallback(1))
                
                target.authenticateUser('', '', callback);

                expect(callback).toHaveBeenCalledWith(null, user, undefined);
            });
        });
    });

    describe('getUserByToken', () => {
        let callback: Spy;

        beforeEach(() => {
            callback = jasmine.createSpy('callback');
        });
        
        it('decodes the token', () => {
            options.localTokenSecret = 'password';

            target.getUserByToken('this is a token', callback);

            expect(jwt.decode).toHaveBeenCalledWith('this is a token', 'password');
        });

        it('returns an auth error if the signature verification fails', () => {
            spy(jwt.decode).and.throwError('Signature verification failed');

            target.getUserByToken('', callback);

            expect(callback).toHaveBeenCalledWith(null, null, new Error('Signature verification failed'));
        });

        it('returns a regular error if the error message is anything else', () => {
            spy(jwt.decode).and.throwError('anything else');

            target.getUserByToken('', callback);

            expect(callback).toHaveBeenCalledWith(new Error('anything else'), null, undefined);
        });

        it('returns a Token Expired auth error when the time is after the exp', () => {
            spy(jwt.decode).and.returnValue({ exp: 4000 });
            spy(now.unix).and.returnValue(5000);

            target.getUserByToken('', callback);

            expect(callback).toHaveBeenCalledWith(null, null, new Error('Token Expired'));
        });

        it('calls findUserById with the id found on the token subject', () => {
            spy(jwt.decode).and.returnValue({ sub: 'user id', exp: 1 });

            target.getUserByToken('', callback);

            expect(usersRepository.findUserById).toHaveBeenCalledWith('user id', callback);
        });
    });

    describe('createToken', () => {
        it('returns a token with the correct exp timestamp', () => {
            spy(now.unix).and.returnValue(5000);
            options.tokenDurationInSeconds = 300;

            let actual = target.createToken('', '');

            expect(actual.exp).toBe(5300);
        });

        it('encodes issuer, subject, and expiration as the token', () => {
            spy(now.unix).and.returnValue(5000);
            spy(jwt.encode).and.returnValue('this is a token');

            options.tokenDurationInSeconds = 300;
            options.localTokenSecret = 'password';

            let actual = target.createToken('issuer', 'subject');

            expect(jwt.encode).toHaveBeenCalledWith({ iss: 'issuer', sub: 'subject', exp: 5300}, 'password');
            expect(actual.token).toBe('this is a token');
        });
    });

    
});
