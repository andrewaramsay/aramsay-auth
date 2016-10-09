import { Application } from 'express';
import { AuthenticationService, UsersService } from '../business';
import { Passport } from '../util';
export declare class PassportConfig {
    private authenticationService;
    private usersService;
    private passport;
    private initialized;
    constructor(authenticationService: AuthenticationService, usersService: UsersService, passport: Passport);
    configurePassport(app: Application): void;
}
