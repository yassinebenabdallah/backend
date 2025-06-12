import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import handleError from "../middlewares/errors/handleError.js";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY; 

const signUp = async (req, res) => {
try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log("existingUser", existingUser);
    if (existingUser) {
        return handleError(res, null, "Email already exists", 409);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '1d' });
    return res.status(201).json({
        newUser,
        token,
    })
}
catch (error) {
    handleError(res, error,"Error in SignUp", 500);
}
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return handleError(res, null, "Invalid email or password", 400);
        }

        const isMatched = await bcrypt.compare(password, existingUser.password);
        if (!isMatched) {
            return handleError(res, null, "Invalid email or password", 401);
        }

        const token = jwt.sign({ id: existingUser._id }, SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).json({
            existingUser,
            token
        });
    }
    catch (error) {
        handleError(res, error, "Error in Login", 500);
    }
}
const authenticationController = {
    signUp,
    login
}

export default authenticationController