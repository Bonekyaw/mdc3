"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productController_1 = require("../../controllers/productController");
var router = express_1.default.Router();
// GET localhost:8080/api/v1/products?limit=10&category=1&cursor=5
// Get all products
router.get("/products", productController_1.index);
// router.get('/products', authorise(true, "admin"), index);
// GET localhost:8080/api/v1/products/1234 - get a product
router.get("/products/:id", productController_1.show);
// POST localhost:8080/api/v1/products/add-favourite
router.post("/products/favourite-toggle", productController_1.toggleFavourite);
exports.default = router;
//# sourceMappingURL=product.js.map