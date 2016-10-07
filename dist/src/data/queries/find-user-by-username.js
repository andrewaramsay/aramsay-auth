"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var find_user_base_1 = require('./find-user-base');
var FindUserByUsername = (function (_super) {
    __extends(FindUserByUsername, _super);
    function FindUserByUsername(username) {
        _super.call(this);
        this.username = username;
    }
    Object.defineProperty(FindUserByUsername.prototype, "filter", {
        get: function () {
            return {
                username: this.username.toLowerCase()
            };
        },
        enumerable: true,
        configurable: true
    });
    return FindUserByUsername;
}(find_user_base_1.FindUserBase));
exports.FindUserByUsername = FindUserByUsername;
//# sourceMappingURL=find-user-by-username.js.map