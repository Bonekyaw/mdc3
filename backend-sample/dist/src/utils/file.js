"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUploadFile = void 0;
var checkUploadFile = function (image) {
    if (!image) {
        var err = new Error("It is not a valid image.");
        err.status = 409;
        err.code = "Error_Invalid";
        throw err;
    }
};
exports.checkUploadFile = checkUploadFile;
//# sourceMappingURL=file.js.map