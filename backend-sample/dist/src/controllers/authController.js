"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.login = exports.confirmPassword = exports.verifyOTP = exports.register = void 0;
require("dotenv/config");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var crypto_1 = require("crypto");
var express_validator_1 = require("express-validator");
// import { v4: uuidv4 } from "uuid";
// import moment from 'moment';
var moment = require("moment");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var auth_1 = require("./../utils/auth");
var authService_1 = require("../services/authService");
var userService_1 = require("../services/userService");
/*
 * POST localhost:8080/api/v1/register
 * Register a new user using Phone & password only
 * In real world, OTP should be used to verify phone number
 * But in this app, we will simulate fake OTP - 123456
 */
function generateRandomToken(length) {
    if (length === void 0) { length = 32; }
    return (0, crypto_1.randomBytes)(length).toString("hex"); // Generates a hexadecimal token
}
exports.register = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var phone, user, otpCheck, token, result, otp, otpData, lastRequest, isSameDate, otpData, err, otpData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                phone = req.body.phone;
                return [4 /*yield*/, (0, authService_1.getUserByPhone)(phone)];
            case 1:
                user = _a.sent();
                (0, auth_1.checkPhoneExist)(user);
                return [4 /*yield*/, (0, authService_1.getOtpByPhone)(phone)];
            case 2:
                otpCheck = _a.sent();
                token = generateRandomToken();
                otp = "123456";
                if (!!otpCheck) return [3 /*break*/, 4];
                otpData = {
                    phone: phone, // phone
                    otp: otp, // fake OTP
                    rememberToken: token,
                    count: 1,
                };
                return [4 /*yield*/, (0, authService_1.createOtp)(otpData)];
            case 3:
                result = _a.sent();
                return [3 /*break*/, 9];
            case 4:
                lastRequest = new Date(otpCheck.updatedAt).toLocaleDateString();
                isSameDate = lastRequest == new Date().toLocaleDateString();
                (0, auth_1.checkOtpErrorIfSameDate)(isSameDate, otpCheck);
                if (!!isSameDate) return [3 /*break*/, 6];
                otpData = {
                    otp: otp,
                    rememberToken: token,
                    count: 1,
                    error: 0,
                };
                return [4 /*yield*/, (0, authService_1.updateOtp)(otpCheck.id, otpData)];
            case 5:
                result = _a.sent();
                return [3 /*break*/, 9];
            case 6:
                if (!(otpCheck.count === 3)) return [3 /*break*/, 7];
                err = new Error("OTP requests are allowed only 3 times per day. Please try again tomorrow,if you reach the limit.");
                err.status = 405;
                err.code = "Error_OverLimit";
                return [2 /*return*/, next(err)];
            case 7:
                otpData = {
                    otp: otp,
                    rememberToken: token,
                    count: {
                        increment: 1,
                    },
                };
                return [4 /*yield*/, (0, authService_1.updateOtp)(otpCheck.id, otpData)];
            case 8:
                result = _a.sent();
                _a.label = 9;
            case 9:
                res.status(200).json({
                    message: "We are sending OTP to 09".concat(result.phone, "."),
                    phone: result.phone,
                    token: result.rememberToken,
                });
                return [2 /*return*/];
        }
    });
}); });
/*
 * POST localhost:8080/api/v1/verify-otp
 * Verify OTP app sent recently
 */
exports.verifyOTP = [
    // Validate and sanitize fields.
    (0, express_validator_1.body)("token", "Token must not be empty.").trim().notEmpty().escape(),
    (0, express_validator_1.body)("phone", "Invalid Phone Number.")
        .trim()
        .notEmpty()
        .matches("^[0-9]+$")
        .isLength({ min: 5, max: 12 })
        .escape(),
    (0, express_validator_1.body)("otp", "OTP is not invalid.")
        .trim()
        .notEmpty()
        .matches("^[0-9]+$")
        .isLength({ min: 6, max: 6 })
        .escape(),
    (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, err, _a, token, phone, otp, user, otpCheck, lastRequest, isSameDate, result, otpData_1, err, difference, err, otpData_2, otpData_3, err, randomToken, otpData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        err = new Error("Validation failed!");
                        err.status = 400;
                        err.code = "Error_Invalid";
                        return [2 /*return*/, next(err)];
                    }
                    _a = req.body, token = _a.token, phone = _a.phone, otp = _a.otp;
                    return [4 /*yield*/, (0, authService_1.getUserByPhone)(phone)];
                case 1:
                    user = _b.sent();
                    (0, auth_1.checkPhoneExist)(user);
                    return [4 /*yield*/, (0, authService_1.getOtpByPhone)(phone)];
                case 2:
                    otpCheck = _b.sent();
                    (0, auth_1.checkOtpPhone)(otpCheck);
                    lastRequest = new Date(otpCheck.updatedAt).toLocaleDateString();
                    isSameDate = lastRequest == new Date().toLocaleDateString();
                    (0, auth_1.checkOtpErrorIfSameDate)(isSameDate, otpCheck);
                    if (!(otpCheck.rememberToken !== token)) return [3 /*break*/, 4];
                    otpData_1 = {
                        error: 5,
                    };
                    return [4 /*yield*/, (0, authService_1.updateOtp)(otpCheck.id, otpData_1)];
                case 3:
                    result = _b.sent();
                    err = new Error("Token is invalid.");
                    err.status = 400;
                    err.code = "Error_Invalid";
                    return [2 /*return*/, next(err)];
                case 4:
                    difference = moment() - moment(otpCheck.updatedAt);
                    // console.log("Diff", difference);
                    if (difference > 90000) {
                        err = new Error("OTP is expired.");
                        err.status = 403;
                        err.code = "Error_Expired";
                        return [2 /*return*/, next(err)];
                    }
                    if (!(otpCheck.otp !== otp)) return [3 /*break*/, 9];
                    if (!!isSameDate) return [3 /*break*/, 6];
                    otpData_2 = {
                        error: 1,
                    };
                    return [4 /*yield*/, (0, authService_1.updateOtp)(otpCheck.id, otpData_2)];
                case 5:
                    result = _b.sent();
                    return [3 /*break*/, 8];
                case 6:
                    otpData_3 = {
                        error: {
                            increment: 1,
                        },
                    };
                    return [4 /*yield*/, (0, authService_1.updateOtp)(otpCheck.id, otpData_3)];
                case 7:
                    result = _b.sent();
                    _b.label = 8;
                case 8:
                    err = new Error("OTP is incorrect.");
                    err.status = 401;
                    err.code = "Error_Invalid";
                    return [2 /*return*/, next(err)];
                case 9:
                    randomToken = generateRandomToken();
                    otpData = {
                        verifyToken: randomToken,
                        count: 1,
                        error: 1,
                    };
                    return [4 /*yield*/, (0, authService_1.updateOtp)(otpCheck.id, otpData)];
                case 10:
                    result = _b.sent();
                    res.status(200).json({
                        message: "Successfully OTP is verified",
                        phone: result.phone,
                        token: result.verifyToken,
                    });
                    return [2 /*return*/];
            }
        });
    }); }),
];
/*
 * POST localhost:8080/api/v1/confirm-password
 * Verify Token and set up password
 */
exports.confirmPassword = [
    // Validate and sanitize fields.
    (0, express_validator_1.body)("token", "Token must not be empty.").trim().notEmpty().escape(),
    (0, express_validator_1.body)("phone", "Invalid Phone Number.")
        .trim()
        .notEmpty()
        .matches("^[0-9]+$")
        .isLength({ min: 5, max: 12 })
        .escape(),
    (0, express_validator_1.body)("password", "Password must be 8 digits.")
        .trim()
        .notEmpty()
        .matches("^[0-9]+$")
        .isLength({ min: 8, max: 8 })
        .escape(),
    (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, err, _a, token, phone, password, user, otpCheck, err, result, otpData, err, difference, err, salt, hashPassword, randToken, userData, newUser, payload, refreshToken, jwtToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        err = new Error("Validation failed!");
                        err.status = 400;
                        err.code = "Error_Invalid";
                        return [2 /*return*/, next(err)];
                    }
                    _a = req.body, token = _a.token, phone = _a.phone, password = _a.password;
                    return [4 /*yield*/, (0, authService_1.getUserByPhone)(phone)];
                case 1:
                    user = _b.sent();
                    (0, auth_1.checkPhoneExist)(user);
                    return [4 /*yield*/, (0, authService_1.getOtpByPhone)(phone)];
                case 2:
                    otpCheck = _b.sent();
                    (0, auth_1.checkOtpPhone)(otpCheck);
                    if (otpCheck.error === 5) {
                        err = new Error("This request may be an attack. If not, try again tomorrow.");
                        err.status = 401;
                        err.code = "Error_Unauthorised";
                        return [2 /*return*/, next(err)];
                    }
                    if (!(otpCheck.verifyToken !== token)) return [3 /*break*/, 4];
                    otpData = {
                        error: 5,
                    };
                    return [4 /*yield*/, (0, authService_1.updateOtp)(otpCheck.id, otpData)];
                case 3:
                    result = _b.sent();
                    err = new Error("Token is invalid.");
                    err.status = 400;
                    err.code = "Error_Invalid";
                    return [2 /*return*/, next(err)];
                case 4:
                    difference = moment() - moment(otpCheck.updatedAt);
                    // console.log("Diff", difference);
                    if (difference > 300000) {
                        err = new Error("Your request is expired. Please try again.");
                        err.status = 403;
                        err.code = "Error_Expired";
                        return [2 /*return*/, next(err)];
                    }
                    return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 5:
                    salt = _b.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 6:
                    hashPassword = _b.sent();
                    randToken = generateRandomToken();
                    userData = {
                        phone: req.body.phone,
                        password: hashPassword,
                        randToken: randToken,
                    };
                    return [4 /*yield*/, (0, authService_1.createUser)(userData)];
                case 7:
                    newUser = _b.sent();
                    payload = { id: newUser.id };
                    refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                        expiresIn: "7d",
                    });
                    jwtToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
                        expiresIn: 60 * 15, // 15 mins
                    });
                    res.status(201).json({
                        message: "Successfully created an account.",
                        token: jwtToken,
                        user_id: newUser.id,
                        randToken: randToken,
                        refreshToken: refreshToken,
                    });
                    return [2 /*return*/];
            }
        });
    }); }),
];
/*
 * POST localhost:8080/api/v1/login
 * Login using phone and password
 */
exports.login = [
    // Validate and sanitize fields.
    (0, express_validator_1.body)("password", "Password must be 8 digits.")
        .trim()
        .notEmpty()
        .matches("^[0-9]+$")
        .isLength({ min: 8, max: 8 })
        .escape(),
    (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, err, _a, phone, password, user, err, result, isEqual, lastRequest, isSameDate, userData, userData, userData, err, randToken, userData, userData, payload, refreshToken, jwtToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        err = new Error("Validation failed!");
                        err.status = 400;
                        err.code = "Error_Invalid";
                        return [2 /*return*/, next(err)];
                    }
                    _a = req.body, phone = _a.phone, password = _a.password;
                    return [4 /*yield*/, (0, authService_1.getUserByPhone)(phone)];
                case 1:
                    user = _b.sent();
                    (0, auth_1.checkPhoneIfNotExist)(user);
                    // Wrong Password allowed 3 times per day
                    if (user.status === "freeze") {
                        err = new Error("Your account is temporarily locked. Please contact us.");
                        err.status = 401;
                        err.code = "Error_Freeze";
                        return [2 /*return*/, next(err)];
                    }
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    isEqual = _b.sent();
                    if (!!isEqual) return [3 /*break*/, 9];
                    lastRequest = new Date(user.updatedAt).toLocaleDateString();
                    isSameDate = lastRequest == new Date().toLocaleDateString();
                    if (!!isSameDate) return [3 /*break*/, 4];
                    userData = {
                        error: 1,
                    };
                    return [4 /*yield*/, (0, authService_1.updateUser)(user.id, userData)];
                case 3:
                    result = _b.sent();
                    return [3 /*break*/, 8];
                case 4:
                    if (!(user.error >= 2)) return [3 /*break*/, 6];
                    userData = {
                        status: "freeze",
                    };
                    return [4 /*yield*/, (0, authService_1.updateUser)(user.id, userData)];
                case 5:
                    result = _b.sent();
                    return [3 /*break*/, 8];
                case 6:
                    userData = {
                        error: {
                            increment: 1,
                        },
                    };
                    return [4 /*yield*/, (0, authService_1.updateUser)(user.id, userData)];
                case 7:
                    result = _b.sent();
                    _b.label = 8;
                case 8:
                    err = new Error("Password is wrong.");
                    err.status = 401;
                    err.code = "Error_Invalid";
                    return [2 /*return*/, next(err)];
                case 9:
                    randToken = generateRandomToken();
                    if (!(user.error >= 1)) return [3 /*break*/, 11];
                    userData = {
                        error: 0,
                        randToken: randToken,
                    };
                    return [4 /*yield*/, (0, authService_1.updateUser)(user.id, userData)];
                case 10:
                    result = _b.sent();
                    return [3 /*break*/, 13];
                case 11:
                    userData = {
                        randToken: randToken,
                    };
                    return [4 /*yield*/, (0, authService_1.updateUser)(user.id, userData)];
                case 12:
                    result = _b.sent();
                    _b.label = 13;
                case 13:
                    payload = { id: user.id };
                    refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                        expiresIn: "7d",
                    });
                    jwtToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
                        expiresIn: 60 * 15, // "15 mins"
                    });
                    res.status(200).json({
                        message: "Successfully Logged In.",
                        token: jwtToken,
                        user_id: user.id,
                        randToken: randToken,
                        refreshToken: refreshToken,
                    });
                    return [2 /*return*/];
            }
        });
    }); }),
];
exports.refreshToken = [
    // Validate and sanitize fields.
    (0, express_validator_1.body)("refreshToken", "RefreshToken must not be empty.")
        .trim()
        .notEmpty()
        .escape(),
    (0, express_validator_1.body)("randToken", "RandToken must not be empty.").trim().notEmpty().escape(),
    (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, err, authHeader, err, _a, refreshToken, randToken, decodedToken, userId, user, userData_1, err, randTokenNew, userData, payload, refreshTokenNew, jwtToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        err = new Error("Validation failed!");
                        err.status = 400;
                        err.code = "Error_Invalid";
                        return [2 /*return*/, next(err)];
                    }
                    authHeader = req.get("Authorization");
                    if (!authHeader) {
                        err = new Error("You are not an authenticated user!.");
                        err.status = 401;
                        err.code = "Error_Unauthenticated";
                        throw err;
                    }
                    _a = req.body, refreshToken = _a.refreshToken, randToken = _a.randToken;
                    try {
                        decodedToken = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                    }
                    catch (error) {
                        error.status = 401;
                        error.message = "App needs to be logged out.";
                        error.code = "Error_Attack"; // LogOut
                        return [2 /*return*/, next(error)];
                    }
                    userId = decodedToken.id;
                    return [4 /*yield*/, (0, userService_1.getUserById)(userId)];
                case 1:
                    user = _b.sent();
                    (0, auth_1.checkUser)(user);
                    if (!(user.randToken !== randToken)) return [3 /*break*/, 3];
                    userData_1 = {
                        error: 5,
                    };
                    return [4 /*yield*/, (0, authService_1.updateUser)(userId, userData_1)];
                case 2:
                    _b.sent();
                    err = new Error("This request may be an attack. Please contact the user team.");
                    err.status = 400;
                    err.code = "Error_Attack";
                    return [2 /*return*/, next(err)];
                case 3:
                    randTokenNew = generateRandomToken();
                    userData = {
                        randToken: randTokenNew,
                    };
                    return [4 /*yield*/, (0, authService_1.updateUser)(userId, userData)];
                case 4:
                    _b.sent();
                    payload = { id: userId };
                    refreshTokenNew = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                        expiresIn: "7d",
                    });
                    jwtToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
                        expiresIn: 60 * 15, // "15 mins"
                    });
                    res.status(200).json({
                        message: "Successfully sent a new token.",
                        token: jwtToken,
                        user_id: userId,
                        randToken: randTokenNew,
                        refreshToken: refreshTokenNew,
                    });
                    return [2 /*return*/];
            }
        });
    }); }),
];
//# sourceMappingURL=authController.js.map