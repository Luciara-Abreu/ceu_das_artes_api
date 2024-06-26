import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../service/user.service';
import { validateMiddleware } from '../middlewares/validate.middleware';
import { createUserSchema, deleteUserSchema, showUserSchema, updateUserSchema } from '../helpers/schemas/validate.user.schema';
import { authMiddleware } from '../middlewares/auth.middleware';
import { Role } from '../helpers/enum';
import { roleMiddleware } from '../middlewares/role.middleware';

const route = Router();

const userService = new UserService();
const userController = new UserController(userService);

route.get('/', authMiddleware, roleMiddleware([Role.User, Role.Admin]), async (req: Request, res: Response) => {
  return userController.list(req, res);
});

route.get(
  '/:id',
  authMiddleware,
  roleMiddleware([Role.User, Role.Admin]),
  showUserSchema,
  validateMiddleware,
  async (req: Request, res: Response) => {
    return userController.show(req, res);
  },
);

route.post('/', authMiddleware, roleMiddleware([Role.Admin]), createUserSchema, validateMiddleware, async (req: Request, res: Response) => {
  return userController.create(req, res);
});

route.patch('/:id', authMiddleware, roleMiddleware([Role.Admin]), updateUserSchema, validateMiddleware, async (req: Request, res: Response) => {
  return userController.update(req, res);
});

route.delete('/:id', authMiddleware, roleMiddleware([Role.Admin]), deleteUserSchema, validateMiddleware, async (req: Request, res: Response) => {
  return userController.delete(req, res);
});

export default route;
