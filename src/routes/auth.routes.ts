import { Request, Response, Router } from 'express';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { EtherealMailProvider } from '../providers/ethereal-mail.provider';
import { forgetAuthSchema, loginAuthSchema, resetAuthSchema } from '../helpers/schemas/validate.auth.schema';
import { validateMiddleware } from '../middlewares/validate.middleware';

const route = Router();

const etherealMailProvider = new EtherealMailProvider();
const authService = new AuthService(etherealMailProvider);
const authController = new AuthController(authService);

route.post('/', loginAuthSchema, validateMiddleware, async (req: Request, res: Response) => authController.login(req, res));
route.post('/forget', forgetAuthSchema, validateMiddleware, async (req: Request, res: Response) => authController.forget(req, res));
route.post('/reset', resetAuthSchema, validateMiddleware, async (req: Request, res: Response) => authController.reset(req, res));
route.get('/profile', authMiddleware, async (req: Request, res: Response) => authController.profile(req, res));

export default route;
