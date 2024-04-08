import { Router } from 'express';
import userRoute from './user.routes';
import bookRoute from './book.routes';
import locationRoute from './location.routes';

const router = Router();

router.use('/user', userRoute);
router.use('/book', bookRoute);
router.use('/location', locationRoute);

export default router;
