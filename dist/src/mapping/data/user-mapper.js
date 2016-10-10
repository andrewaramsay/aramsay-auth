"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aramsay_framework_1 = require('aramsay-framework');
var aramsay_injector_1 = require('aramsay-injector');
var UserMapper = (function (_super) {
    __extends(UserMapper, _super);
    function UserMapper() {
        _super.apply(this, arguments);
    }
    UserMapper.prototype.toBusinessModel = function (source, callback) {
        var destination = {};
        destination.loginAttempts = source.loginAttempts;
        destination.passwordHash = source.password;
        callback(null, destination);
    };
    UserMapper.prototype.fromBusinessModel = function (source, callback) {
        var destination = {};
        destination.loginAttempts = source.loginAttempts;
        destination.password = source.passwordHash;
        callback(null, destination);
    };
    UserMapper = __decorate([
        aramsay_injector_1.Injectable({ instanceMode: aramsay_injector_1.InstanceMode.SingleInstance }), 
        __metadata('design:paramtypes', [])
    ], UserMapper);
    return UserMapper;
}(aramsay_framework_1.TypeMapper));
exports.UserMapper = UserMapper;
//# sourceMappingURL=user-mapper.js.map