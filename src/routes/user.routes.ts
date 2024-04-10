import { Request, Response, Router } from 'express';
import { UseService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';
import { UserController } from '../controllers/user.controller';

const route = Router();

const userRepository = new UserRepository();
const userService = new UseService(userRepository);
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
