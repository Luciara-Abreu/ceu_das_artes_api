import { Request, Response, Router } from 'express';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { EtherealMailProvider } from '../providers/ethereal-mail.provider';

const route = Router();

const etherealMailProvider = new EtherealMailProvider();
const authService = new AuthService(etherealMailProvider);
const authController = new AuthController(authService);

route.post('/', async (req: Request, res: Response) => authController.login(req, res));
route.post('/forget', async (req: Request, res: Response) => authController.forget(req, res));
route.post('/reset', async (req: Request, res: Response) => authController.reset(req, res));
route.get('/profile', authMiddleware, async (req: Request, res: Response) => authController.profile(req, res));

export default route;
