import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//import auth from "../middleware/auth.js";
import Users from "../models/Users.js";
import dotenv from 'dotenv';
dotenv.config();

// Register
export const register = async (req, res) => {
    try {
        let { email, password, passwordCheck, name } = req.body;
        // validate
        if (!email || !password || !passwordCheck)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." });
        if (password.length < 5)
            return res
                .status(400)
                .json({ msg: "The password needs to be at least 5 characters long." });
        if (password !== passwordCheck)
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." });
        const existingUser = await Users.findOne({ email: email });
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "An account with this email already exists." });
        if (!name) name = email;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new Users({
            email,
            password: passwordHash,
            name
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validate
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        const user = await Users.findOne({ email: email });
        if (!user)
            return res
                .status(400)
                .json({ msg: "No account with this email has been registered." });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Check if token is valid
export const tokenIsValid = async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);
        const user = await Users.findById(verified.id);
        if (!user) return res.json(false);
        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const auths = async (req, res) => {
    // const user = await Users.findById(req.user);
    // res.json({
    //     name: user.name,
    //     id: user._id,
    // });
};
