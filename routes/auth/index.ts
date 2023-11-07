import express from "express";
import authController from "../../controller/auth";

const router = express.Router();
router.post("/login", authController.signIn);
router.post("/register", authController.signUp);

export default router;
