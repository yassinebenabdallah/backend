import mongoose from "mongoose";
import validator from 'validator'; // for mail validation

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, // email is required
        unique: true,
        minlength:6,
        validate: {
            validator: (value) => validator.isEmail(value),
        }  
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    name: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Create and export the model
export default mongoose.model("User", userSchema);