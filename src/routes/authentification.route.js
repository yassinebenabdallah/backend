import express from 'express';
import authentificationController from '../controllers/authentification.controller.js';

const router = express.Router();

router.post('/signup',authentificationController.signUp);
router.post('/login',authentificationController.login);

export default router;