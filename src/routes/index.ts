import { Router } from 'express';
import userRoute from './user.routes';
import bookRoute from './book.routes';

const router = Router();

router.use('/user', userRoute);
router.use('/book', bookRoute);

export default router;
