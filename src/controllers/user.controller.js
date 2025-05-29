// Import model
import User from '../models/user.model.js'
import handleError from '../middlewares/errors/handleError.js'

//user creation
const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ name: req.body.name });
        if (existingUser) {
            return handleError(res, null, "user with this name already exists", 409); // 409 Conflict
        }
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return handleError(res, null, "user with this email already exists", 409); // 409 Conflict
        }
        const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json({ payload: newUser });
    } catch (error) {
        handleError(res, error, "Error in creating new user", 500);
    }
};

// Get a single user by ID
const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return handleError(res, null, "No user found", 404); // 404 Not Found
        }
        return res.status(200).json(user);
    } catch (error) {
        handleError(res, error, "Error in getting one user", 500); // 500 server error
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(204).send(); // No content
        }
        return res.status(200).json(users);
    } catch (error) {
        handleError(res, error, "Error in getting all users", 500);
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return handleError(res, null, "user with this email already exists", 409); // 409 Conflict
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return handleError(res, null, "No data found", 404);
        }
        return res.status(200).json(user);
        } catch (error) {
        handleError(res, error, "Error in updating user", 500);
    }
};

// Delete an user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return handleError(res, null, "No user found", 404);
        }
    return res.status(200).json({ payload: "user deleted" });
    } catch (error) {
        const existingEmail = await User.findOne({ email: req.body.email });
        handleError(res, error, "Error in deleting user", 500);
    }
};

const userController = {
    createUser,
    getOneUser,
    getAllUsers,
    updateUser,
    deleteUser,
}

export default userController