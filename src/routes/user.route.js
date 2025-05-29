import express from 'express';
import userController from '../controllers/user.controller.js'

const router = express.Router();
router.post('/',userController.createUser);
router.get('/',userController.getAllUsers);
router.get('/:id',userController.getOneUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

export default router;