import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { sendResetEmail } from "../utils/resetEmail.js";
import { getUser } from "../utils/getUser.js";


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    console.log(req.body)

    if ([username, email, password].includes("")) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Email is not valid"
            })
        }
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists, please login or use another email!"
        })
    }

    const user = await User.create({ username, email, password })
    if (user) {
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            }
        })
    } else {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, while creating a user please try again later!"
        })
    }

});

const sendResetPasswordEmail = asyncHandler(async (req, res) => {
    let { email, username } = req.body

    email = email?.trim();
    username = username?.trim();


    // getting user instance
    let user = await getUser(email, username)

    // checking if user exists
    if (!user) {
        return res.status(400).json({
            success: false,
            message: `No account found with given ${email ? "email" : "username"}`
        })
    }

    // sending otp
    try {
        const resetToken = await sendResetEmail(user.email)
        console.log(resetToken)
        const userInstance = await User.findOneAndUpdate({ email: user.email }, {
            resetToken, resetTokenExpiration: Date.now() + 10 * 60 * 1000
        }, { new: true })
        return res.status(200).json({
            success: true,
            message: "reset link sent successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong, while sending reset link please try again later!"
        })
    }
});

const verifyResetToken = asyncHandler(async (req, res) => {
    let { resetToken, password } = req.body
    resetToken = resetToken?.trim();

    // getting user instance
    if (!resetToken) {
        return res.status(400).json({
            success: false,
            message: "Invalid reset token"
        })
    }
    let user = await User.findOne({ resetToken })
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid reset token"
        })
    }

    if (user.resetTokenExpiration < Date.now()) {
        return res.status(400).json({
            success: false,
            message: "Reset token has expired"
        })
    }
    user = await User.findOne({ resetToken });
    user.password = password;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();
    
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

})

const loginUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    res.status(200).json({ message: "Login User" })
})


export { registerUser, sendResetPasswordEmail, verifyResetToken, loginUser };