"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = require("../../controllers/authController");
var check_1 = require("../../middlewares/check");
var router = express_1.default.Router();
/*
 * POST localhost:8080/api/v1/register
 * Register an user using Phone & password only
 * In real world, OTP should be used to verify phone number
 * But in this app, we will simulate fake OTP - 123456
 */
router.post("/register", check_1.validatePhone, authController_1.register);
router.post("/verify-otp", authController_1.verifyOTP);
router.post("/confirm-password", authController_1.confirmPassword);
router.post("/login", check_1.validatePhone, authController_1.login);
// Refresh Token for expired jwt token.
router.post("/refresh-token", authController_1.refreshToken);
exports.default = router;
//# sourceMappingURL=auth.js.map