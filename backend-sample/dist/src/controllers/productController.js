"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.toggleFavourite = exports.show = exports.index = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var express_validator_1 = require("express-validator");
var client_1 = require("@prisma/client"); // { Prisma, PrismaClient }
var prisma = new client_1.PrismaClient();
var productService_1 = require("../services/productService");
exports.index = [
    // Validate and sanitize fields.
    (0, express_validator_1.query)("limit", "Limit number must be integer.").isInt({ gt: 0 }).toInt(),
    (0, express_validator_1.query)("cursor", "Cursor must be integer.")
        .isInt({ gt: 0 })
        .toInt()
        .optional(),
    (0, express_validator_1.query)("category", "category id must be integer.")
        .isInt({ gt: 0 })
        .toInt()
        .optional(),
    (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, err, limit, cursor, filters, userId, fields, relation, options, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        err = new Error("Validation failed!");
                        err.status = 400;
                        err.code = "Error_Invalid";
                        return [2 /*return*/, next(err)];
                    }
                    limit = req.query.limit || 4;
                    cursor = req.query.cursor ? { id: +req.query.cursor } : null;
                    filters = req.query.category
                        ? { categoryId: +req.query.category }
                        : null;
                    userId = req.userId || 0;
                    fields = {
                        id: true,
                        brand: true,
                        title: true,
                        star: true,
                        quantity: true,
                        price: true,
                        discount: true,
                        image: true,
                        categoryId: true,
                    };
                    relation = {
                        users: {
                            where: {
                                id: userId,
                            },
                            select: {
                                id: true,
                            },
                        },
                    };
                    options = { take: limit };
                    if (cursor) {
                        options.skip = 1;
                        options.cursor = cursor;
                    }
                    if (filters) {
                        options.where = filters;
                    }
                    options.orderBy = { id: "desc" };
                    options.select = __assign(__assign({}, fields), relation);
                    return [4 /*yield*/, (0, productService_1.getAllProducts)(options, +limit)];
                case 1:
                    products = _a.sent();
                    res.status(200).json(products);
                    return [2 /*return*/];
            }
        });
    }); }),
];
exports.show = [
    // Validate and sanitize fields.
    (0, express_validator_1.param)("id", "Product ID must be integer.").isInt({ gt: 0 }).toInt(),
    (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, err, productId, userId, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        err = new Error("Validation failed!");
                        err.status = 400;
                        err.code = "Error_Invalid";
                        return [2 /*return*/, next(err)];
                    }
                    productId = req.params.id;
                    userId = req.userId || 0;
                    return [4 /*yield*/, (0, productService_1.getProductById)(+productId, +userId)];
                case 1:
                    product = _a.sent();
                    res.status(200).json(product);
                    return [2 /*return*/];
            }
        });
    }); }),
];
exports.toggleFavourite = [
    // Validate and sanitize fields.
    (0, express_validator_1.body)("productId", "Product ID must not be empty.").isInt({ gt: 0 }).toInt(),
    (0, express_validator_1.body)("favourite", "Favourite must not be empty.").isBoolean(),
    (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, err, productId, favourite, userId, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        err = new Error("Validation failed!");
                        err.status = 400;
                        err.code = "Error_Invalid";
                        return [2 /*return*/, next(err)];
                    }
                    productId = req.body.productId;
                    favourite = req.body.favourite;
                    userId = req.userId || 0;
                    if (!favourite) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, productService_1.addProductToFavourite)(+productId, +userId)];
                case 1:
                    _a.sent();
                    result = { productId: productId, userId: userId };
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, productService_1.removeProductFromFavourite)(+productId, +userId)];
                case 3:
                    _a.sent();
                    result = { productId: productId, userId: null };
                    _a.label = 4;
                case 4:
                    res.status(200).json(result);
                    return [2 /*return*/];
            }
        });
    }); }),
];
//# sourceMappingURL=productController.js.map