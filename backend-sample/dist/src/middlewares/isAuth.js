"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var isAuth = function (req, res, next) {
    var authHeader = req.get("Authorization");
    if (!authHeader) {
        var err = new Error("You are not an authenticated user!.");
        err.status = 401;
        err.code = "Error_Unauthenticated";
        return next(err);
    }
    var token = authHeader.split(" ")[1];
    var decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            error.status = 401;
            error.message = "Access Token has expired.";
            error.code = "Error_AccessTokenExpired";
        }
        else {
            error.status = 400;
            error.message = "Access Token is invalid.";
            error.code = "Error_Attack";
        }
        return next(error);
    }
    // if (!decodedToken) {
    //   const err: any = new Error("You are not an authenticated user!.");
    //   err.status = 401;
    //   err.code = "Error_AccessTokenExpired";
    //   return next(err);
    // }
    req.userId = decodedToken.id;
    next();
};
exports.default = isAuth;
//# sourceMappingURL=isAuth.js.map