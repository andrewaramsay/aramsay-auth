import { Injector } from 'aramsay-injector';
import { Moment } from 'moment';
import { compare } from 'bcrypt-nodejs';
import { encode, decode } from 'jwt-simple';
import * as moment from 'moment';

import { Bcrypt, Jwt } from '../util';

export interface ModuleDependencies {
    bcrypt?: () => Bcrypt;
    jwt?: () => Jwt;
    moment?: () => () => Moment
}

export const momentInjectorToken = 'aramsay-auth:moment';
export const jwtInjectorToken = 'aramsay-auth:jwt-simple';
export const bcryptInjectorToken = 'aramsay-auth:bcrypt-nodejs';

export function registerDependencies(dependencies: ModuleDependencies, injector: Injector) {
    if (!dependencies.moment) {
        dependencies.moment = () => moment;
    }

    if (!dependencies.bcrypt) {
        dependencies.bcrypt = () => { return { compare }; }
    }

    if (!dependencies.jwt) {
        dependencies.jwt = () => { return { encode, decode }; }
    }
    
    injector.registerFactory(momentInjectorToken, dependencies.moment);
    injector.registerFactory(bcryptInjectorToken, dependencies.bcrypt);
    injector.registerFactory(jwtInjectorToken, dependencies.jwt);
}
