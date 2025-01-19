"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.checkOtpErrorIfSameDate = exports.checkOtpPhone = exports.checkPhoneIfNotExist = exports.checkPhoneExist = void 0;
var checkPhoneExist = function (user) {
    // // This is not middleware
    if (user) {
        var err = new Error("This phone number has already registered!.");
        err.status = 409;
        err.code = "Error_AlreadyRegistered";
        throw err;
    }
};
exports.checkPhoneExist = checkPhoneExist;
var checkPhoneIfNotExist = function (user) {
    if (!user) {
        var err = new Error("This phone number has not registered!.");
        err.status = 401;
        err.code = "Error_Unauthenticated";
        throw err;
    }
};
exports.checkPhoneIfNotExist = checkPhoneIfNotExist;
var checkOtpPhone = function (otpCheck) {
    if (!otpCheck) {
        var err = new Error("Phone number is incorrect.");
        err.status = 400;
        err.code = "Error_Invalid";
        throw err;
    }
};
exports.checkOtpPhone = checkOtpPhone;
var checkOtpErrorIfSameDate = function (isSameDate, otpCheck) {
    if (isSameDate && otpCheck.error === 5) {
        var err = new Error("OTP is wrong 5 times today. Try again tomorrow.");
        err.status = 401;
        err.code = "Error_OverLimit";
        throw err;
    }
};
exports.checkOtpErrorIfSameDate = checkOtpErrorIfSameDate;
var checkUser = function (user) {
    if (!user) {
        var err = new Error("This account has not registered!.");
        err.status = 401;
        err.code = "Error_Unauthenticated";
        throw err;
    }
};
exports.checkUser = checkUser;
//# sourceMappingURL=auth.js.map