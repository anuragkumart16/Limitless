import { Router } from "express";
import { registerUser,sendResetPasswordEmail, verifyResetToken, loginUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/reset").post(sendResetPasswordEmail)
router.route("/verifytoken").post(verifyResetToken)
router.route('/login').post(loginUser)

export default router