import Product from '../models/product.model.js  '
import handleError from '../middlewares/errors/handleError.js'
import Category from '../models/category.model.js'

const createProduct = async (req, res) => {
    try {
        const existingCategory = await Category.findById(req.body.category);
        if (!existingCategory) {
            return handleError(res, null, "The specified category does not exist", 400);
        }
        const existingProduct = await Product.findOne({ name: req.body.name });
        if (existingProduct) {
            return handleError(res, null, "product with this name already exists", 409); // 409 Conflict
        }
        if (typeof req.body.price !== 'number' || req.body.price <= 0) {
            return handleError(res, null, "price must be a positive number", 400);}

        if (typeof req.body.stock !== 'number' || req.body.stock <= 0) {
            return handleError(res, null, "stock must be a positive number", 400);}
        
        const newProduct = new Product(req.body);
        await newProduct.save();
        return res.status(201).json({ payload: newProduct });
    } catch (error) {
        handleError(res, error, "Error in creating new prodcut", 500);
    }
};

const getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return handleError(res, null, "No product found", 404); // 404 Not Found
        }
        return res.status(200).json(product);
    } catch (error) {
        handleError(res, error, "Error in getting one product", 500); // 500 server error
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(204).send(); // No content
        }

        return res.status(200).json(products);
    } catch (error) {
        handleError(res, error, "Error in getting all products", 500);
    }
};

const updateProduct = async (req, res) => {
    try {
        const existingCategory = await Category.findById(req.body.category);
        if (!existingCategory) {
            return handleError(res, null, "The specified category does not exist", 400);
        }
        const existingProduct = await Product.findOne({ name: req.body.name });
        if (existingProduct) {
            return handleError(res, null, "product with this name already exists", 409); // 409 Conflict
        }
        if (req.body.price <= 0) {
            return handleError(res, null, "price must be a positive number", 400);}

        if ( req.body.stock <= 0) {
            return handleError(res, null, "stock must be a positive number", 400);}

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return handleError(res, null, "No data found", 404);
        }
        return res.status(200).json(product);
    } catch (error) {
        handleError(res, error, "Error in updating product", 500);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return handleError(res, null, "No product found", 404);
        }

        return res.status(200).json({ payload: "product deleted" });
    } catch (error) {
        handleError(res, error, "Error in deleting product", 500);
    }
};

const getProductByCategoryId = async (req, res) => {
  try {
    const categoryId = req.query.id;
    const existingCategory = await Category.findById(categoryId);

    if (!categoryId) {
      return res.status(400).json({ message: 'CategoryId missing in query.' });
    }

    if (!existingCategory) {
      return res.status(404).json([]);
    }

    const products = await Product.find({ category: categoryId }).populate('category', 'name');

    res.status(200).json(products);
  }

  catch (error) {
    res.status(500).json({ message: 'Error retrieving products.', error });
  }
};


const productController = {
    createProduct,
    getOneProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductByCategoryId,
    
}

export default productController