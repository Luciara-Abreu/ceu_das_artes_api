import { Router } from 'express';
import authRoute from './auth.routes';
import userRoute from './user.routes';
import bookRoute from './book.routes';
import locationRoute from './location.routes';
import devolutionRoute from './devolution.routes';
import courseRoute from './course.routes';

const router = Router();

router.use('/login', authRoute);
router.use('/course', courseRoute);
router.use('/user', userRoute);
router.use('/book', bookRoute);
router.use('/location', locationRoute);
router.use('/devolution', devolutionRoute);
router.use('/course', courseRoute);

export default router;
