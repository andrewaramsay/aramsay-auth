import { Injector } from 'aramsay-injector';
import { Moment } from 'moment';
import { Bcrypt, Jwt, Passport } from '../util';
export interface ModuleDependencies {
    bcrypt?: () => Bcrypt;
    jwt?: () => Jwt;
    moment?: () => () => Moment;
    passport?: () => Passport;
}
export declare const momentInjectorToken: string;
export declare const jwtInjectorToken: string;
export declare const bcryptInjectorToken: string;
export declare const passportInjectorToken: string;
export declare class AuthModule {
    static registerDependencies(dependencies: ModuleDependencies, injector: Injector): void;
}
