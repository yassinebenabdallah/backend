import express from 'express';
import productController from '../controllers/product.controller.js'


const router = express.Router();
router.post('/',productController.createProduct);
router.get('/',productController.getAllProducts);
router.get('/category', productController.getProductByCategoryId);
router.get('/:id',productController.getOneProduct);
router.put('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);

export default router;