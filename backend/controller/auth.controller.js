import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        // get valuse from req.body that coming from client (frontend) - the input fields that passed from frontend

        const { fullName, username, password, confirmPassword, gender } =
            req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password does not match" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }

        if (
            !fullName ||
            !username ||
            !password ||
            !confirmPassword ||
            !gender
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (!newUser) {
            return res
                .status(400)
                .json({ message: "Error creating user. Please try again." });
        } else {
            generateTokenAndSetCookie(res, newUser._id);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        }
    } catch (error) {
        console.log(`Error in signup: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = (req, res) => {
    res.json({ message: "Login successful" });
};

export const logout = (req, res) => {
    res.json({ message: "logout successful" });
};
