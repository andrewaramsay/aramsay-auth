import { Inject, Injectable } from 'aramsay-injector';
import { Application } from 'express';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';

import { AuthenticationService, UsersService } from '../business';
import { Passport } from '../util';
import { passportInjectorToken } from '../dependency-injection/auth-module';

@Injectable({ singleton: true })
export class PassportConfig {
    private initialized: boolean;
    
    constructor(
        private authenticationService: AuthenticationService,
        private usersService: UsersService,
        @Inject(passportInjectorToken) private passport: Passport) {
    }

    configurePassport(app: Application): void {
        if (this.initialized) {
            // TODO: Warn
            return;
        }

        app.use(this.passport.initialize());

        this.passport.use('token', new BearerStrategy((token, callback) => this.authenticationService.getUserByToken(token, callback)));
        this.passport.use('local', new LocalStrategy((username, password, callback) => this.authenticationService.authenticateUser(username, password, callback)));
        this.passport.use('anonymous', new AnonymousStrategy());

        this.passport.serializeUser((user, done) => done(null, user.id));
        this.passport.deserializeUser((id, done) => this.usersService.getUserById(id, done));

        this.initialized = true;
    }
}