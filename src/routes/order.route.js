import express from 'express';
import orderController from '../controllers/order.controller.js'


const router = express.Router();
router.post('/',orderController.createOrder);
router.get('/',orderController.getOrders);
router.get('/order', orderController.getOrderByIdUser);
router.get('/order/status', orderController.getOrderByStatus);
router.get('/:id',orderController.getOneOrder);
router.put('/:id',orderController.updateOrder);
router.delete('/:id',orderController.deleteOrder);


export default router;