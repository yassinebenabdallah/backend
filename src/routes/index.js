import { Router } from 'express';
import exampleRoutes from './example.route.js';
import userRoutes from './user.route.js';
import categoryRoutes from './category.route.js';
import productRoutes from './product.route.js'
import orderRoutes from './order.route.js'
import authRoutes from './authentification.route.js'
import isAuth from '../middlewares/auth.middlewear.js';
import isAdmin from '../middlewares/admin.middlewear.js';

const router = Router();
router.use('/examples', exampleRoutes);
router.use('/users',isAuth,isAdmin, userRoutes);
router.use('/categories', categoryRoutes);
router.use('/products',productRoutes);
router.use('/orders',isAuth,isAdmin,orderRoutes);
router.use('/autentifications',authRoutes);

export default router;