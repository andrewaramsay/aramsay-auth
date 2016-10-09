"use strict";
var bcrypt_nodejs_1 = require('bcrypt-nodejs');
var jwt_simple_1 = require('jwt-simple');
var moment = require('moment');
exports.momentInjectorToken = 'aramsay-auth:moment';
exports.jwtInjectorToken = 'aramsay-auth:jwt-simple';
exports.bcryptInjectorToken = 'aramsay-auth:bcrypt-nodejs';
var AuthModule = (function () {
    function AuthModule() {
    }
    AuthModule.registerDependencies = function (dependencies, injector) {
        if (!dependencies.moment) {
            dependencies.moment = function () { return moment; };
        }
        if (!dependencies.bcrypt) {
            dependencies.bcrypt = function () { return { compare: bcrypt_nodejs_1.compare }; };
        }
        if (!dependencies.jwt) {
            dependencies.jwt = function () { return { encode: jwt_simple_1.encode, decode: jwt_simple_1.decode }; };
        }
        injector.registerFactory(exports.momentInjectorToken, dependencies.moment);
        injector.registerFactory(exports.bcryptInjectorToken, dependencies.bcrypt);
        injector.registerFactory(exports.jwtInjectorToken, dependencies.jwt);
    };
    return AuthModule;
}());
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth-module.js.map