import { Request, Response, Router } from 'express';
import { AuthService } from '../service/auth.service';
import { AuthRepository } from '../repository/auth.repository';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const route = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

route.post('/', async (req: Request, res: Response) => {
  return authController.login(req, res);
});

route.get('/profile', authMiddleware, async (req: Request, res: Response) => {
  return authController.profile(req, res);
});

export default route;
