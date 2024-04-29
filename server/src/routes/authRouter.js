import { Router } from 'express';
import { validateUser } from '../middlewares/validateUser.js';
import { addUser } from '../controllers/authController.js';
import { loginUser } from '../controllers/authController.js';

export const authRouter = Router();

authRouter.post('/register', validateUser, addUser).post('/login', loginUser);
