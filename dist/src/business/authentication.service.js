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
var aramsay_framework_1 = require('aramsay-framework');
var aramsay_injector_1 = require('aramsay-injector');
var users_repository_1 = require('../data/repositories/users.repository');
var auth_module_1 = require('../dependency-injection/auth-module');
var MILLISECONDS = 1000;
var AuthenticationService = (function () {
    function AuthenticationService(options, // TODO: What is this dependency, really
        usersRepository, moment, jwt, bcrypt, timeout) {
        this.options = options;
        this.usersRepository = usersRepository;
        this.moment = moment;
        this.jwt = jwt;
        this.bcrypt = bcrypt;
        this.timeout = timeout;
    }
    AuthenticationService.prototype.authenticateUser = function (username, password, callback) {
        var _this = this;
        this.usersRepository.findUserByUsername(username, function (err, user) {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return _this.delayLoginFailedResponse(_this.options.failedAttemptsWhenUserNotFound, callback);
            }
            _this.bcrypt.compare(password, user.passwordHash, function (compareErr, isMatch) {
                if (compareErr) {
                    return callback(compareErr);
                }
                if (isMatch) {
                    user.loginAttempts = 0;
                    _this.saveUser(user, callback, user);
                }
                else {
                    user.loginAttempts += 1;
                    _this.saveFailedLoginAttempts(user, callback);
                }
            });
        });
    };
    AuthenticationService.prototype.saveUser = function (user, callback, response, authError) {
        this.usersRepository.saveUser(user, function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, response, authError);
        });
    };
    AuthenticationService.prototype.saveFailedLoginAttempts = function (user, callback) {
        var _this = this;
        this.delayLoginFailedResponse(user.loginAttempts, function (err, userResponse, authError) {
            if (err) {
                return callback(err);
            }
            _this.saveUser(user, callback, userResponse, authError);
        });
    };
    AuthenticationService.prototype.delayLoginFailedResponse = function (failedAttempts, callback) {
        var calculatedWaitTime = Math.pow(this.options.loginFailedSlowdownFactor, failedAttempts);
        var waitTimeSeconds = Math.min(calculatedWaitTime, this.options.loginFailedMaxWaitTime);
        Math.trunc;
        this.timeout.setTimeout(function () {
            callback(null, null, new Error('Invalid Username/Password, or account is locked.'));
        }, waitTimeSeconds * MILLISECONDS);
    };
    AuthenticationService.prototype.getUserByToken = function (token, callback) {
        var _this = this;
        this.decode(token, function (err, payload, authErr) {
            if (err || authErr) {
                return callback(err, null, authErr);
            }
            if (_this.moment().unix() > payload.exp) {
                return callback(null, null, new Error('Token Expired'));
            }
            var userId = payload.sub;
            _this.usersRepository.findUserById(userId, callback);
        });
    };
    AuthenticationService.prototype.decode = function (token, callback) {
        var payload = null;
        try {
            payload = this.jwt.decode(token, this.options.localTokenSecret);
            return callback(null, payload);
        }
        catch (err) {
            if (err.message === 'Signature verification failed') {
                return callback(null, null, err);
            }
            return callback(err);
        }
    };
    AuthenticationService.prototype.createToken = function (iss, sub) {
        var exp = this.moment().unix() + this.options.tokenDurationInSeconds;
        var payload = {
            iss: iss,
            sub: sub,
            exp: exp
        };
        return {
            token: this.jwt.encode(payload, this.options.localTokenSecret),
            exp: exp
        };
    };
    AuthenticationService = __decorate([
        aramsay_injector_1.Injectable({ singleton: true }),
        __param(2, aramsay_injector_1.Inject(auth_module_1.momentInjectorToken)),
        __param(3, aramsay_injector_1.Inject(auth_module_1.jwtInjectorToken)),
        __param(4, aramsay_injector_1.Inject(auth_module_1.bcryptInjectorToken)), 
        __metadata('design:paramtypes', [Object, users_repository_1.UsersRepository, Function, Object, Object, aramsay_framework_1.TimeoutAdapter])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map