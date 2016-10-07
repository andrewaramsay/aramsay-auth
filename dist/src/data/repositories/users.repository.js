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
var aramsay_injector_1 = require('aramsay-injector');
var aramsay_framework_1 = require('aramsay-framework');
var find_user_by_username_1 = require('../queries/find-user-by-username');
var find_user_by_id_1 = require('../queries/find-user-by-id');
var save_user_1 = require('../queries/save-user');
var data_1 = require('../../mapping/data');
var UsersRepository = (function () {
    function UsersRepository(database, userMapper) {
        this.database = database;
        this.userMapper = userMapper;
    }
    UsersRepository.prototype.findUserByUsername = function (username, callback) {
        this.database.findOne(new find_user_by_username_1.FindUserByUsername(username), this.userMapper.mapCallback(callback));
    };
    UsersRepository.prototype.saveUser = function (user, callback) {
        var _this = this;
        this.userMapper.fromBusinessModel(user, function (err, dbUser) {
            if (err) {
                return callback(err);
            }
            _this.database.update(new save_user_1.SaveUser(dbUser), callback);
        });
    };
    UsersRepository.prototype.findUserById = function (userId, callback) {
        this.database.findOne(new find_user_by_id_1.FindUserById(userId), this.userMapper.mapCallback(callback));
    };
    UsersRepository = __decorate([
        aramsay_injector_1.Injectable({ singleton: true }), 
        __metadata('design:paramtypes', [aramsay_framework_1.DatabaseExecutor, data_1.UserMapper])
    ], UsersRepository);
    return UsersRepository;
}());
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map