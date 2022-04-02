import { Router } from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';

const router = Router();
router.get('/', (req, res) => {
  res.sendStatus(200);
});
router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
