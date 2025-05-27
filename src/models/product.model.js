import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true, 
        min:0
    },
    image: {
        type: String,
        default: "https://hips.hearstapps.com/hmg-prod/images/mhl-opener-run-shoes-311-67edd9f20e75a.jpg?crop=0.655xw:0.983xh;0.168xw,0&resize=1120:*",
    },
    category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
    stock: {
        type: Number,
        required: true, 
        min:0
    },
});

// Create and export the model
export default mongoose.model("product", productSchema);