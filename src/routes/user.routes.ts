import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../service/user.service';

const route = Router();

const userService = new UserService();
const userController = new UserController(userService);

route.get('/', async (req: Request, res: Response) => {
  return userController.getAll(req, res);
});

route.get('/:id', async (req: Request, res: Response) => {
  return userController.getId(req, res);
});

route.post('/', async (req: Request, res: Response) => {
  return userController.create(req, res);
});

route.patch('/:id', async (req: Request, res: Response) => {
  return userController.update(req, res);
});

route.delete('/:id', async (req: Request, res: Response) => {
  return userController.delete(req, res);
});

export default route;
