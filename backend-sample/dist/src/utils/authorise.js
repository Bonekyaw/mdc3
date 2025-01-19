"use strict";
/*
 * Authorization
 * These two functions are same
 * authorise(true, user, "super", "manager", "editor") === authorise(false, user, "user")
 * (false, user, "user") In these parameters, user param in the middle is an instance model of the database table.
 * last "user" means a "user" role.
 * true means that his role must be one of these.
 * false means that his role must not be one of these.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var authorise = function (permission, user) {
    var roles = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        roles[_i - 2] = arguments[_i];
    }
    var result = roles.includes(user.role);
    if (!permission && result) {
        var err = new Error("This action is not allowed.");
        err.status = 403;
        err.code = "Error_Unauthorised";
        throw err;
    }
    if (permission && !result) {
        var err = new Error("This action is not allowed.");
        err.status = 403;
        err.code = "Error_Unauthorised";
        throw err;
    }
};
exports.default = authorise;
//# sourceMappingURL=authorise.js.map