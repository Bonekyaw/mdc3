"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
// import bodyParser from 'body-parser';
// import path from "path";
var rateLimiter_1 = require("./middlewares/rateLimiter");
var isAuth_1 = __importDefault(require("./middlewares/isAuth"));
var authorise_1 = __importDefault(require("./middlewares/authorise"));
var user_1 = __importDefault(require("./routes/v1/user"));
var auth_1 = __importDefault(require("./routes/v1/auth"));
var category_1 = __importDefault(require("./routes/v1/category"));
var product_1 = __importDefault(require("./routes/v1/product"));
var app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json()); // application/json
// app.use(bodyParser.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
// app.options("*", cors());
app.use(rateLimiter_1.limiter);
// app.get("/health", (req: Request, res: Response) => {
//   res.status(200).json({ message: "This is health check" });
// });
app.use("/api/v1", auth_1.default);
app.use("/api/v1", isAuth_1.default, (0, authorise_1.default)(false, "admin"), user_1.default); // authorise() is just an example for authorization
app.use("/api/v1", isAuth_1.default, category_1.default);
app.use("/api/v1", isAuth_1.default, product_1.default);
app.use(express_1.default.static("public"));
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT, "."));
});
app.use(function (err, req, res, next) {
    var status = err.status || 500;
    var message = err.message;
    var error_code = err.code || "Error_Code";
    res.status(status).json({ error: error_code, message: message });
});
//# sourceMappingURL=index.js.map