import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request, Access Token Absent!"
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request, Invalid Access Token!"
            })
        }
        const user = await User.findById(decoded.id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request, Invalid Access Token!"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Caught Error, Unauthorized Request, Invalid Access Token!"
        });
    }
});

export { verifyJWT };
