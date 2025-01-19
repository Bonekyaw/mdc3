"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var fileStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/images");
        // const ext = file.mimetype.split("/")[0];
        // if (ext === "image") {
        //   cb(null, "uploads/images");
        // } else {
        //   cb(null, "uploads/files");
        // }
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var upload = (0, multer_1.default)({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 * 2 }, // maximum 2 MB
});
exports.default = upload;
//# sourceMappingURL=uploadFile.js.map