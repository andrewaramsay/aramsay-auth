"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var find_user_base_1 = require('./find-user-base');
var FindUserById = (function (_super) {
    __extends(FindUserById, _super);
    function FindUserById(userId) {
        _super.call(this);
        this.userId = userId;
    }
    Object.defineProperty(FindUserById.prototype, "filter", {
        get: function () {
            return {
                _id: this.userId
            };
        },
        enumerable: true,
        configurable: true
    });
    return FindUserById;
}(find_user_base_1.FindUserBase));
exports.FindUserById = FindUserById;
//# sourceMappingURL=find-user-by-id.js.map