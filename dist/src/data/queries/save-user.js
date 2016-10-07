"use strict";
var SaveUser = (function () {
    function SaveUser(user) {
        this.user = user;
        this.user.username = this.user.username.toLowerCase();
    }
    Object.defineProperty(SaveUser.prototype, "collection", {
        get: function () {
            return 'users';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SaveUser.prototype, "filter", {
        get: function () {
            return {
                username: this.user.username
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SaveUser.prototype, "options", {
        get: function () {
            return { upsert: true };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SaveUser.prototype, "documents", {
        get: function () {
            return [this.user];
        },
        enumerable: true,
        configurable: true
    });
    return SaveUser;
}());
exports.SaveUser = SaveUser;
//# sourceMappingURL=save-user.js.map