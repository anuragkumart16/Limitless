import { User } from "../models/user.models.js";


async function getUser(email,username) {
    let user;
    if (email) {
        // checking if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid email"
            })
        }

        // getting user instance
        user = await User.findOne({ email })

    } else if (username) {
        // checking if username is valid
        if (username === "") {
            return res.status(400).json({
                success: false,
                message: "Enter a valid username"
            })
        }
        // getting user instance
        user = await User.findOne({ username })
    }
    return user
}

export { getUser }