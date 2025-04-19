import { Router } from "express";
import { registerUser,sendResetPasswordEmail, verifyResetToken, loginUser , logoutUser , getAccessToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../midddleware/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser)
userRouter.route("/reset").post(sendResetPasswordEmail)
userRouter.route("/verifytoken").post(verifyResetToken)
userRouter.route('/login').post(loginUser)
userRouter.route('/getaccesstoken').post(getAccessToken)

// secured routes
userRouter.route('/logout').post(verifyJWT,logoutUser)

export {userRouter}