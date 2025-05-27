import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is require
        unique: true,
        
    },
    description: {
        type: String,
    },
   
});

export default mongoose.model("category", categorySchema);