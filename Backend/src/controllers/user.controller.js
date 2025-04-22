import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { sendResetEmail } from "../utils/resetEmail.js";
import { getUser } from "../utils/getUser.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    if ([username, email, password].includes("")) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Email is not valid",
            });
        }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists, please login or use another email!",
        });
    }

    const user = await User.create({ username, email, password });
    if (user) {
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } else {
        return res.status(500).json({
            success: false,
            message:
                "Something went wrong, while creating a user please try again later!",
        });
    }
});

const sendResetPasswordEmail = asyncHandler(async (req, res) => {
    let { email, username } = req.body;


    email = email?.trim();
    username = username?.trim();

    // getting user instance
    let user = await getUser(email, username);
    console.log(user)
    // checking if user exists
    if (!user) {
        return res.status(400).json({
            success: false,
            message: `No account found with given ${email ? "email" : "username"}`,
        });
    }

    // sending otp
    try {
        const resetToken = await sendResetEmail(user.email);
        console.log(resetToken);
        const userInstance = await User.findOneAndUpdate(
            { email: user.email },
            {
                resetToken,
                resetTokenExpiration: Date.now() + 10 * 60 * 1000,
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Reset link sent successfully to registered email",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:
                "Something went wrong, while sending reset link please try again later!",
        });
    }
});

const verifyResetToken = asyncHandler(async (req, res) => {
    let { resetToken, password } = req.body;
    resetToken = resetToken?.trim();

    // getting user instance
    if (!resetToken) {
        return res.status(400).json({
            success: false,
            message: "Invalid reset token",
        });
    }
    let user = await User.findOne({ resetToken });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid reset token",
        });
    }

    if (user.resetTokenExpiration < Date.now()) {
        return res.status(400).json({
            success: false,
            message: "Reset token has expired",
        });
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
});

const loginUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    let { email, username, password } = req.body;
    email = email?.trim();
    username = username?.trim();
    password = password?.trim();

    if ([email, username, password].includes("")) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    // getting user instance
    let user = await getUser(email, username);

    // checking if user exists
    if (!user) {
        return res.status(400).json({
            success: false,
            message: `No account found with given ${email ? "email" : "username"}`,
        });
    }

    // checking if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        return res.status(400).json({
            success: false,
            message: "Incorrect password",
        });
    }

    // generating access token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // saving refresh token
    user.refreshToken = refreshToken;
    try {
        await user.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:
                "Something went wrong, while logging in, please try again later!",
        });
    }

    // sending response
    res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE,
            sameSite: process.env.COOKIE_SAME_SITE,
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE,
            sameSite: process.env.COOKIE_SAME_SITE,
        })
        .json({
            success: true,
            message: "Login successful",
            data: {
                accessToken,
                refreshToken,
            },
        });
});

const getAccessToken = asyncHandler(async (req, res) => {
    let refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({
            success: false,
            message: "Refresh token is required",
        });
    }
    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Invalid refresh token",
        });
    }
    const user = await User.findById(decoded.id);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid refresh token",
        });
    }

    if (user.refreshToken !== refreshToken) {
        return res.status(403).json({
            success: false,
            message: "Refresh token mismatch",
        });
    }

    const accessToken = user.generateAccessToken();
    res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE,
            sameSite: process.env.COOKIE_SAME_SITE,
        })
        .json({
            success: true,
            message: "Access token generated successfully",
            data: {
                accessToken,
            },
        });
});

const logoutUser = asyncHandler(async (req, res) => {
    req.user.refreshToken = null;
    await req.user.save();

    res.clearCookie("accesstoken", {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE,
        sameSite: process.env.COOKIE_SAME_SITE,
    });

    res.clearCookie("refreshtoken", {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE,
        sameSite: process.env.COOKIE_SAME_SITE,
    });

    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
});

const sendOK = asyncHandler(async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Access token verified successfully!",
    });
});

export {
    registerUser,
    sendResetPasswordEmail,
    verifyResetToken,
    loginUser,
    logoutUser,
    getAccessToken,
    sendOK,
};
