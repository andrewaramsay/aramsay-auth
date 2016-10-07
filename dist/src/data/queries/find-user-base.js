"use strict";
var FindUserBase = (function () {
    function FindUserBase() {
    }
    Object.defineProperty(FindUserBase.prototype, "collection", {
        get: function () {
            return 'users';
        },
        enumerable: true,
        configurable: true
    });
    FindUserBase.prototype.mapResults = function (record, callback) {
        callback(null, {
            _id: record['_id'],
            displayName: record['displayName'],
            loginAttempts: record['loginAttempts'],
            password: record['password'],
            roles: record['roles'],
            username: record['username']
        });
    };
    return FindUserBase;
}());
exports.FindUserBase = FindUserBase;
//# sourceMappingURL=find-user-base.js.map