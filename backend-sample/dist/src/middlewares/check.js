"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhone = void 0;
var validatePhone = function (req, res, next) {
    var phone = req.body.phone.replace(/\s/g, "");
    if (phone.match("^[0-9]+$") == null) {
        // res.status(400).json({
        //     error: "Invalid phone number. Please enter the correct one."
        // });
        // throw new Error("Invalid phone number. Please enter the correct one.");
        var err = new Error("Invalid phone number. Please enter the correct one.");
        err.status = 400;
        err.code = "Error_Invalid";
        return next(err);
    }
    if (phone.slice(0, 2) == "09") {
        phone = phone.substring(2, phone.length);
    }
    if (phone.length < 5 || phone.length > 12) {
        var err = new Error("Invalid phone number. Please enter the correct one.");
        err.status = 400;
        err.code = "Error_Invalid";
        return next(err);
    }
    req.body.phone = phone;
    next();
};
exports.validatePhone = validatePhone;
//# sourceMappingURL=check.js.map