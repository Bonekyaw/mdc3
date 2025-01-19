"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var categoryController_1 = require("../../controllers/categoryController");
var router = express_1.default.Router();
// GET localhost:8080/api/v1/categories
// Get all categories
router.get("/categories", categoryController_1.index);
// router.get('/categories', authorise(true, "admin"), index);
exports.default = router;
//# sourceMappingURL=category.js.map