import Category from '../models/category.model.js'
import handleError from '../middlewares/errors/handleError.js'
import Product from "../models/product.model.js"

const createCategory = async (req, res) => {
    try {
        const existingCategory = await Category.findOne({ name: req.body.name });
        if (existingCategory) {
            return handleError(res, null, "category with this name already exists", 409); 
        }
        const newCat = new Category(req.body);
        await newCat.save();
        return res.status(201).json(newCat);
    } catch (error) {
        handleError(res, error, "Error in creating new category", 500);
    }
};

const getOneCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return handleError(res, null, "No category found", 404); 
        }
        return res.status(200).json(category);
    } catch (error) {
        handleError(res, error, "Error in getting one category", 500); 
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories.length === 0) {
            return res.status(204).send(); // No content
        }
        return res.status(200).json(categories);
    } catch (error) {
        handleError(res, error, "Error in getting all categories", 500);
    }
};

const updateCategory = async (req, res) => {
    try {
        const existingName = await Category.findOne({ name: req.body.name });
        if (existingName) {
            return handleError(res, null, "category with this name already exists", 409); }
            
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return handleError(res, null, "No data found", 404);
        }
        return res.status(200).json(category);
        } catch (error) {
        handleError(res, error, "Error in updating category", 500);
    }
};


const deleteProductByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const product = await Product.findOne({ category: categoryId });
        if (product) {
            return handleError(res, null, "You must delete all products in this category before deleting it", 400);
        }

        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return handleError(res, null, "Category not found", 404);
        }
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        return handleError(res, error, "An error occurred while deleting the category", 500);
    }
};

const categoryController = {
    createCategory,
    getOneCategory,
    getAllCategories,
    updateCategory,
    deleteProductByCategoryId
}

export default categoryController