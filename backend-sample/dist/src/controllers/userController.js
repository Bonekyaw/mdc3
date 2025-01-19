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
exports.destroy = exports.update = exports.show = exports.store = exports.index = exports.uploadProfile = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var promises_1 = require("node:fs/promises");
var path_1 = __importDefault(require("path"));
var express_validator_1 = require("express-validator");
var client_1 = require("@prisma/client"); // { Prisma, PrismaClient }
var prisma = new client_1.PrismaClient();
var authService_1 = require("../services/authService");
var file_1 = require("../utils/file");
var paginate_1 = require("../utils/paginate");
exports.uploadProfile = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, image, user, imageUrl, error_1, userData_1, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.userId;
                image = req.file;
                user = req.user;
                (0, file_1.checkUploadFile)(image);
                imageUrl = image.path.replace("\\", "/");
                if (!user.profile) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 5]);
                return [4 /*yield*/, (0, promises_1.unlink)(path_1.default.join(__dirname, "../..", user.profile))];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                error_1 = _a.sent();
                userData_1 = {
                    profile: imageUrl,
                };
                return [4 /*yield*/, (0, authService_1.updateUser)(id, userData_1)];
            case 4:
                _a.sent();
                return [3 /*break*/, 5];
            case 5:
                userData = {
                    profile: imageUrl,
                };
                return [4 /*yield*/, (0, authService_1.updateUser)(id, userData)];
            case 6:
                _a.sent();
                res
                    .status(200)
                    .json({ message: "Successfully uploaded the image.", profile: imageUrl });
                return [2 /*return*/];
        }
    });
}); });
exports.index = [
    // Validate and sanitize fields.
    (0, express_validator_1.query)("page", "Page number must be integer.").isInt({ gt: 0 }).toInt(),
    (0, express_validator_1.query)("limit", "Limit number must be integer.").isInt({ gt: 0 }).toInt(),
    (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, err, _a, page, limit, filters, order, fields, users;
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
                    _a = req.query, page = _a.page, limit = _a.limit;
                    filters = { status: "active" };
                    order = { createdAt: "desc" };
                    fields = {
                        id: true,
                        name: true,
                        phone: true,
                        role: true,
                        status: true,
                        lastLogin: true,
                        profile: true,
                        createdAt: true,
                    };
                    return [4 /*yield*/, (0, paginate_1.offset)(prisma.user, page, limit, filters, order, fields)];
                case 1:
                    users = _b.sent();
                    // const users = await noCount(prisma.user, page, limit, filters, order, fields);
                    // const users = await cursor(
                    //   prisma.user,
                    //   cursors,
                    //   limit,
                    //   filters,
                    //   order,
                    //   fields
                    // );
                    res.status(200).json(users);
                    return [2 /*return*/];
            }
        });
    }); }),
];
exports.store = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json({ success: true });
        return [2 /*return*/];
    });
}); });
exports.show = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json({ success: true });
        return [2 /*return*/];
    });
}); });
exports.update = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json({ success: true });
        return [2 /*return*/];
    });
}); });
exports.destroy = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json({ success: true });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=userController.js.map