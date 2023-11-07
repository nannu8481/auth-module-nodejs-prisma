"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../controller/auth"));
const router = express_1.default.Router();
router.post("/login", auth_1.default.signIn);
router.post("/register", auth_1.default.signUp);
exports.default = router;
