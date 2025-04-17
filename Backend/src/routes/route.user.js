import { Router } from "express";
import { registerUser,sendResetPasswordEmail, verifyResetToken, loginUser , logoutUser , getAccessToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../midddleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/reset").post(sendResetPasswordEmail)
router.route("/verifytoken").post(verifyResetToken)
router.route('/login').post(loginUser)
router.route('/getaccesstoken').post(getAccessToken)

// secured routes
router.route('/logout').post(verifyJWT,logoutUser)

export default router