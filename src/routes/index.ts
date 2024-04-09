import { Router } from 'express';
import userRoute from './user.routes';
import bookRoute from './book.routes';
import locationRoute from './location.routes';
import devolutionRoute from './devolution.routes';

const router = Router();

router.use('/user', userRoute);
router.use('/book', bookRoute);
router.use('/location', locationRoute);
router.use('/devolution', devolutionRoute);

export default router;
