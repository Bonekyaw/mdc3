"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var uploadFile_1 = __importDefault(require("../../middlewares/uploadFile"));
var userController_1 = require("../../controllers/userController");
var router = express_1.default.Router();
// Upload single image
router.put("/users/upload", uploadFile_1.default.single("avatar"), userController_1.uploadProfile);
// Upload multiple images
// router.put('/users/upload',upload.array('avatar'), userController.uploadProfile );
// GET localhost:8080/api/v1/users?page=1&limit=5
// Get all users by Pagination
router.get("/users", userController_1.index);
// router.get('/users', authorise(true, "admin"), index);
// POST localhost:8080/api/v1/users - create an user
router.post("/users", userController_1.store);
// GET localhost:8080/api/v1/users/1234 - get an user
router.get("/users/:id", userController_1.show);
// PUT localhost:8080/api/v1/users/1234 - Update an user
router.put("/users/:id", userController_1.update);
// DELETE localhost:8080/api/v1/users/1234 - delete an user
router.delete("/users/:id", userController_1.destroy);
exports.default = router;
//# sourceMappingURL=user.js.map