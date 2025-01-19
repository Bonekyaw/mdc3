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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cursor = exports.noCount = exports.offset = void 0;
var asyncHandler = require("express-async-handler");
exports.offset = asyncHandler(function (model_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([model_1], args_1, true), void 0, function (model, page, limit, filters, order, fields, relation) {
        var offset, options, totalCount, count, results;
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        if (filters === void 0) { filters = null; }
        if (order === void 0) { order = null; }
        if (fields === void 0) { fields = null; }
        if (relation === void 0) { relation = null; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = (page - 1) * limit;
                    options = { skip: offset, take: limit };
                    if (filters) {
                        options.where = filters;
                    }
                    if (order) {
                        options.orderBy = order;
                    }
                    if (fields) {
                        options.select = fields;
                    }
                    if (relation) {
                        options.include = relation;
                    }
                    totalCount = {};
                    if (filters) {
                        totalCount = { where: filters };
                    }
                    return [4 /*yield*/, model.count(totalCount)];
                case 1:
                    count = _a.sent();
                    return [4 /*yield*/, model.findMany(options)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, {
                            total: count,
                            data: results,
                            currentPage: page,
                            previousPage: page == 1 ? null : page - 1,
                            nextPage: page * limit >= count ? null : page + 1,
                            lastPage: Math.ceil(count / limit),
                            countPerPage: limit,
                        }];
            }
        });
    });
});
exports.noCount = asyncHandler(function (model_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([model_1], args_1, true), void 0, function (model, page, limit, filters, order, fields, relation) {
        var offset, options, results, hasNextPage;
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        if (filters === void 0) { filters = null; }
        if (order === void 0) { order = null; }
        if (fields === void 0) { fields = null; }
        if (relation === void 0) { relation = null; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    offset = (page - 1) * limit;
                    options = { skip: offset, take: limit + 1 };
                    if (filters) {
                        options.where = filters;
                    }
                    if (order) {
                        options.orderBy = order;
                    }
                    if (fields) {
                        options.select = fields;
                    }
                    if (relation) {
                        options.include = relation;
                    }
                    return [4 /*yield*/, model.findMany(options)];
                case 1:
                    results = _a.sent();
                    hasNextPage = false;
                    if (results.length > limit) {
                        // if got an extra result
                        hasNextPage = true; // has a next page of results
                        results.pop(); // remove extra result
                    }
                    return [2 /*return*/, {
                            data: results,
                            currentPage: page,
                            previousPage: page == 1 ? null : page - 1,
                            nextPage: hasNextPage ? page + 1 : null,
                            countPerPage: limit,
                        }];
            }
        });
    });
});
exports.cursor = asyncHandler(function (model_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([model_1], args_1, true), void 0, function (model, cursor, limit, filters, order, fields, relation) {
        var options, results, lastPostInResults, myCursor;
        if (cursor === void 0) { cursor = null; }
        if (limit === void 0) { limit = 10; }
        if (filters === void 0) { filters = null; }
        if (order === void 0) { order = null; }
        if (fields === void 0) { fields = null; }
        if (relation === void 0) { relation = null; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = { take: limit };
                    if (cursor) {
                        options.skip = 1;
                        options.cursor = cursor;
                    }
                    if (filters) {
                        options.where = filters;
                    }
                    if (order) {
                        options.orderBy = order;
                    }
                    if (fields) {
                        options.select = fields;
                    }
                    if (relation) {
                        options.include = relation;
                    }
                    return [4 /*yield*/, model.findMany(options)];
                case 1:
                    results = _a.sent();
                    lastPostInResults = results.length ? results[limit - 1] : null;
                    myCursor = results.length ? lastPostInResults.id : null;
                    return [2 /*return*/, {
                            data: results,
                            nextCursor: myCursor,
                        }];
            }
        });
    });
});
//# sourceMappingURL=paginate.js.map