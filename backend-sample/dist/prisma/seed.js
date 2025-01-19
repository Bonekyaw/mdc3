"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = __importStar(require("bcrypt"));
var prisma = new client_1.PrismaClient();
var userData = [
    {
        name: "Phone Nyo",
        phone: "778661260",
        password: "",
        randToken: "xirj1izi88iisvh0mt6lr9efseef45frt",
    },
    {
        name: "Ko Nay",
        phone: "778661261",
        password: "",
        randToken: "xirj1izi88iisvh0mt6lr9efseef45frt",
    },
    {
        name: "Paing Gyi",
        phone: "778661262",
        password: "",
        randToken: "xirj1izi88iisvh0mt6lr9efseef45frt",
    },
    {
        name: "Jue Jue",
        phone: "778661263",
        password: "",
        randToken: "xirj1izi88iisvh0mt6lr9efseef45frt",
    },
    {
        name: "Nant Su",
        phone: "778661264",
        password: "",
        randToken: "xirj1izi88iisvh0mt6lr9efseef45frt",
    },
];
var categories = [
    { name: "Men", image: "man.png" },
    { name: "Women", image: "woman.png" },
    { name: "Teens", image: "teen.png" },
    { name: "Kids", image: "kid.png" },
    { name: "Babies", image: "baby.png" },
    { name: "Pets", image: "pet.png" },
];
var colors = [
    { name: "black", bgColor: "#000000" },
    { name: "blue", bgColor: "#2B4CC3" },
    { name: "purple", bgColor: "#6680C2" },
    { name: "white", bgColor: "#ffffff" },
];
var sizes = [
    { name: "XS" },
    { name: "S" },
    { name: "M" },
    { name: "L" },
    { name: "XL" },
    { name: "XXL" },
];
var products = [
    {
        categoryId: 1,
        brand: "H&M",
        title: "Oversized Fit Printed Mesh T-Shirt",
        star: 4.9,
        quantity: 160,
        price: 295.5,
        discount: 550,
        image: "t1.png",
        description: "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
    },
    {
        categoryId: 1,
        brand: "H&M",
        title: "Loose Fit T-Shirt",
        star: 4.7,
        quantity: 201,
        price: 199.5,
        discount: 0,
        image: "t3.png",
        description: "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
    },
    {
        categoryId: 2,
        brand: "H&M",
        title: "Regular Fit Linen",
        star: 4.8,
        quantity: 127,
        price: 255,
        discount: 0,
        image: "t2.png",
        description: "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
    },
    {
        categoryId: 1,
        brand: "H&M",
        title: "DryMove Fit",
        star: 4.5,
        quantity: 234,
        price: 220,
        discount: 0,
        image: "t4.png",
        description: "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
    },
    {
        categoryId: 2,
        brand: "H&M",
        title: "Oversized Fit Printed Mesh T-Shirt",
        star: 4.9,
        quantity: 136,
        price: 295,
        discount: 550,
        image: "w1.png",
        description: "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
    },
    {
        categoryId: 2,
        brand: "H&M",
        title: "Regular Fit Linen",
        star: 4.8,
        quantity: 127,
        price: 255,
        discount: 0,
        image: "w2.png",
        description: "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
    },
    {
        categoryId: 1,
        brand: "H&M",
        title: "DryMove Fit",
        star: 4.5,
        quantity: 234,
        price: 220,
        discount: 0,
        image: "w4.png",
        description: "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
    },
    {
        categoryId: 1,
        brand: "H&M",
        title: "Loose Fit T-Shirt",
        star: 4.5,
        quantity: 234,
        price: 220,
        discount: 0,
        image: "w5.png",
        description: "a long- or short-sleeved garment for the upper part of the body, usually lightweight and having a collar and a front opening.",
    },
];
var ColorsOnProducts = [
    { productId: 1, colorId: 1, stock: true },
    { productId: 1, colorId: 2, stock: true },
    { productId: 1, colorId: 3, stock: false },
    { productId: 1, colorId: 4, stock: true },
    { productId: 2, colorId: 1, stock: true },
    { productId: 2, colorId: 2, stock: true },
    { productId: 2, colorId: 3, stock: true },
    { productId: 2, colorId: 4, stock: false },
    { productId: 3, colorId: 1, stock: true },
    { productId: 3, colorId: 2, stock: false },
    { productId: 3, colorId: 3, stock: true },
    { productId: 3, colorId: 4, stock: true },
    { productId: 4, colorId: 1, stock: false },
    { productId: 4, colorId: 2, stock: true },
    { productId: 4, colorId: 3, stock: true },
    { productId: 4, colorId: 4, stock: true },
    { productId: 5, colorId: 1, stock: true },
    { productId: 5, colorId: 2, stock: true },
    { productId: 5, colorId: 3, stock: false },
    { productId: 5, colorId: 4, stock: true },
    { productId: 6, colorId: 1, stock: true },
    { productId: 6, colorId: 2, stock: true },
    { productId: 6, colorId: 3, stock: true },
    { productId: 6, colorId: 4, stock: true },
    { productId: 7, colorId: 1, stock: true },
    { productId: 7, colorId: 2, stock: true },
    { productId: 7, colorId: 3, stock: false },
    { productId: 7, colorId: 4, stock: true },
    { productId: 8, colorId: 1, stock: true },
    { productId: 8, colorId: 2, stock: true },
    { productId: 8, colorId: 3, stock: true },
    { productId: 8, colorId: 4, stock: false },
];
var ProductsOnSizes = [
    { productId: 1, sizeId: 1, stock: true },
    { productId: 1, sizeId: 2, stock: true },
    { productId: 1, sizeId: 3, stock: false },
    { productId: 1, sizeId: 4, stock: true },
    { productId: 1, sizeId: 5, stock: true },
    { productId: 1, sizeId: 6, stock: true },
    { productId: 2, sizeId: 1, stock: true },
    { productId: 2, sizeId: 2, stock: false },
    { productId: 2, sizeId: 3, stock: true },
    { productId: 2, sizeId: 4, stock: true },
    { productId: 2, sizeId: 5, stock: true },
    { productId: 2, sizeId: 6, stock: true },
    { productId: 3, sizeId: 1, stock: true },
    { productId: 3, sizeId: 2, stock: true },
    { productId: 3, sizeId: 3, stock: true },
    { productId: 3, sizeId: 4, stock: true },
    { productId: 3, sizeId: 5, stock: true },
    { productId: 3, sizeId: 6, stock: false },
    { productId: 4, sizeId: 1, stock: true },
    { productId: 4, sizeId: 2, stock: true },
    { productId: 4, sizeId: 3, stock: false },
    { productId: 4, sizeId: 4, stock: true },
    { productId: 4, sizeId: 5, stock: true },
    { productId: 4, sizeId: 6, stock: true },
    { productId: 5, sizeId: 1, stock: true },
    { productId: 5, sizeId: 2, stock: true },
    { productId: 5, sizeId: 3, stock: true },
    { productId: 5, sizeId: 4, stock: true },
    { productId: 5, sizeId: 5, stock: false },
    { productId: 5, sizeId: 6, stock: true },
    { productId: 6, sizeId: 1, stock: true },
    { productId: 6, sizeId: 2, stock: false },
    { productId: 6, sizeId: 3, stock: true },
    { productId: 6, sizeId: 4, stock: true },
    { productId: 6, sizeId: 5, stock: true },
    { productId: 6, sizeId: 6, stock: true },
    { productId: 7, sizeId: 1, stock: true },
    { productId: 7, sizeId: 2, stock: true },
    { productId: 7, sizeId: 3, stock: true },
    { productId: 7, sizeId: 4, stock: true },
    { productId: 7, sizeId: 5, stock: true },
    { productId: 7, sizeId: 6, stock: true },
    { productId: 8, sizeId: 1, stock: true },
    { productId: 8, sizeId: 2, stock: true },
    { productId: 8, sizeId: 3, stock: true },
    { productId: 8, sizeId: 4, stock: true },
    { productId: 8, sizeId: 5, stock: true },
    { productId: 8, sizeId: 6, stock: false },
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var salt, password, _i, userData_1, a, user, _a, categories_1, category, createdCategory, _b, colors_1, color, createdColor, _c, sizes_1, size, createdSize, _d, products_1, product, createdProduct, _e, ColorsOnProducts_1, cp, createdColorProduct, _f, ProductsOnSizes_1, ps, createdProductSize;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.log("Start seeding ...");
                    return [4 /*yield*/, bcrypt.genSalt(10)];
                case 1:
                    salt = _g.sent();
                    return [4 /*yield*/, bcrypt.hash("12345678", salt)];
                case 2:
                    password = _g.sent();
                    _i = 0, userData_1 = userData;
                    _g.label = 3;
                case 3:
                    if (!(_i < userData_1.length)) return [3 /*break*/, 6];
                    a = userData_1[_i];
                    a.password = password;
                    return [4 /*yield*/, prisma.user.create({
                            data: a,
                        })];
                case 4:
                    user = _g.sent();
                    console.log("Created user with id: ".concat(user.id));
                    _g.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    _a = 0, categories_1 = categories;
                    _g.label = 7;
                case 7:
                    if (!(_a < categories_1.length)) return [3 /*break*/, 10];
                    category = categories_1[_a];
                    return [4 /*yield*/, prisma.category.create({ data: category })];
                case 8:
                    createdCategory = _g.sent();
                    console.log("Created category with id: ".concat(createdCategory.id));
                    _g.label = 9;
                case 9:
                    _a++;
                    return [3 /*break*/, 7];
                case 10:
                    _b = 0, colors_1 = colors;
                    _g.label = 11;
                case 11:
                    if (!(_b < colors_1.length)) return [3 /*break*/, 14];
                    color = colors_1[_b];
                    return [4 /*yield*/, prisma.color.create({ data: color })];
                case 12:
                    createdColor = _g.sent();
                    console.log("Created color with id: ".concat(createdColor.id));
                    _g.label = 13;
                case 13:
                    _b++;
                    return [3 /*break*/, 11];
                case 14:
                    _c = 0, sizes_1 = sizes;
                    _g.label = 15;
                case 15:
                    if (!(_c < sizes_1.length)) return [3 /*break*/, 18];
                    size = sizes_1[_c];
                    return [4 /*yield*/, prisma.size.create({ data: size })];
                case 16:
                    createdSize = _g.sent();
                    console.log("Created size with id: ".concat(createdSize.id));
                    _g.label = 17;
                case 17:
                    _c++;
                    return [3 /*break*/, 15];
                case 18:
                    _d = 0, products_1 = products;
                    _g.label = 19;
                case 19:
                    if (!(_d < products_1.length)) return [3 /*break*/, 22];
                    product = products_1[_d];
                    return [4 /*yield*/, prisma.product.create({
                            data: product,
                        })];
                case 20:
                    createdProduct = _g.sent();
                    console.log("Created product with id: ".concat(createdProduct.id));
                    _g.label = 21;
                case 21:
                    _d++;
                    return [3 /*break*/, 19];
                case 22:
                    _e = 0, ColorsOnProducts_1 = ColorsOnProducts;
                    _g.label = 23;
                case 23:
                    if (!(_e < ColorsOnProducts_1.length)) return [3 /*break*/, 26];
                    cp = ColorsOnProducts_1[_e];
                    return [4 /*yield*/, prisma.colorsOnProducts.create({
                            data: cp,
                        })];
                case 24:
                    createdColorProduct = _g.sent();
                    console.log("Created color-product relationship with colorId: ".concat(createdColorProduct.colorId, " and productId: ").concat(createdColorProduct.productId));
                    _g.label = 25;
                case 25:
                    _e++;
                    return [3 /*break*/, 23];
                case 26:
                    _f = 0, ProductsOnSizes_1 = ProductsOnSizes;
                    _g.label = 27;
                case 27:
                    if (!(_f < ProductsOnSizes_1.length)) return [3 /*break*/, 30];
                    ps = ProductsOnSizes_1[_f];
                    return [4 /*yield*/, prisma.productsOnSizes.create({
                            data: ps,
                        })];
                case 28:
                    createdProductSize = _g.sent();
                    console.log("Created product-size relationship with sizeId: ".concat(createdProductSize.sizeId, " and productId: ").concat(createdProductSize.productId));
                    _g.label = 29;
                case 29:
                    _f++;
                    return [3 /*break*/, 27];
                case 30:
                    console.log("Seeding finished.");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
// npx prisma db seed
//# sourceMappingURL=seed.js.map