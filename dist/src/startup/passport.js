"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var aramsay_injector_1 = require('aramsay-injector');
var passport_http_bearer_1 = require('passport-http-bearer');
var passport_local_1 = require('passport-local');
var passport_anonymous_1 = require('passport-anonymous');
var business_1 = require('../business');
var auth_module_1 = require('../dependency-injection/auth-module');
var PassportConfig = (function () {
    function PassportConfig(authenticationService, usersService, passport) {
        this.authenticationService = authenticationService;
        this.usersService = usersService;
        this.passport = passport;
    }
    PassportConfig.prototype.configurePassport = function (app) {
        var _this = this;
        if (this.initialized) {
            // TODO: Warn
            return;
        }
        app.use(this.passport.initialize());
        this.passport.use('token', new passport_http_bearer_1.Strategy(function (token, callback) { return _this.authenticationService.getUserByToken(token, callback); }));
        this.passport.use('local', new passport_local_1.Strategy(function (username, password, callback) { return _this.authenticationService.authenticateUser(username, password, callback); }));
        this.passport.use('anonymous', new passport_anonymous_1.Strategy());
        this.passport.serializeUser(function (user, done) { return done(null, user.id); });
        this.passport.deserializeUser(function (id, done) { return _this.usersService.getUserById(id, done); });
        this.initialized = true;
    };
    PassportConfig = __decorate([
        aramsay_injector_1.Injectable({ instanceMode: aramsay_injector_1.InstanceMode.SingleInstance }),
        __param(2, aramsay_injector_1.Inject(auth_module_1.passportInjectorToken)), 
        __metadata('design:paramtypes', [business_1.AuthenticationService, business_1.UsersService, Object])
    ], PassportConfig);
    return PassportConfig;
}());
exports.PassportConfig = PassportConfig;
//# sourceMappingURL=passport.js.map