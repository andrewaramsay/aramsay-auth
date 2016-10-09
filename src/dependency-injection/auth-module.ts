import { Injector } from 'aramsay-injector';
import { Moment } from 'moment';
import { compare } from 'bcrypt-nodejs';
import { encode, decode } from 'jwt-simple';
import * as moment from 'moment';
import * as passport from 'passport';
// TODO: Am I going to load in a bunch of dependencies I don't really want, would I be better off not even truly depending on them and just specifying the interfaces?

import { Bcrypt, Jwt, Passport } from '../util';

export interface ModuleDependencies {
    bcrypt?: () => Bcrypt;
    jwt?: () => Jwt;
    moment?: () => () => Moment;
    passport?: () => Passport;
}

export const momentInjectorToken = 'aramsay-auth:moment';
export const jwtInjectorToken = 'aramsay-auth:jwt-simple';
export const bcryptInjectorToken = 'aramsay-auth:bcrypt-nodejs';
export const passportInjectorToken = 'aramsay-auth:passport';

export class AuthModule {
    static registerDependencies(dependencies: ModuleDependencies, injector: Injector) {
        if (!dependencies.moment) {
            dependencies.moment = () => moment;
        }

        if (!dependencies.bcrypt) {
            dependencies.bcrypt = () => { return { compare }; }
        }

        if (!dependencies.jwt) {
            dependencies.jwt = () => { return { encode, decode }; }
        }

        if (!dependencies.passport) {
            dependencies.passport = () => passport;
        }
        
        injector.registerFactory(momentInjectorToken, dependencies.moment);
        injector.registerFactory(bcryptInjectorToken, dependencies.bcrypt);
        injector.registerFactory(jwtInjectorToken, dependencies.jwt);
        injector.registerFactory(passportInjectorToken, dependencies.passport);
    }
}
