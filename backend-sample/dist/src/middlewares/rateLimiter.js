"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 15, // Limit each IP to 15 requests per `window` (here, per 1 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // skipSuccessfulRequests: true,      // This is useful for auth check. If request is successful, it never limit.
});
//# sourceMappingURL=rateLimiter.js.map