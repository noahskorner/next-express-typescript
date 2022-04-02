import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import authenticate from '../middleware/authenticate';

const authController = new AuthController();

const authRouter = Router();
authRouter.post('/login', authController.login);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.delete('/logout', authenticate, authController.logout);

export default authRouter;
