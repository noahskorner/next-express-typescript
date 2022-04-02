import { Router } from 'express';
import UserController from '../controllers/user.controller';
import authenticate from '../middleware/authenticate';

const userController = new UserController();

const userRouter = Router();
userRouter.post('/', userController.register);
userRouter.put('/verify-email/:token', userController.verifyEmail);
userRouter.get('/:id', authenticate, userController.getUser);
// router.post(
//   '/reset-password',
//   userValidator.resetPassword,
//   userController.resetPassword,
// );
// router.put(
//   '/password/:token',
//   userValidator.confirmResetPassword,
//   userController.confirmResetPassword,
// );

export default userRouter;
