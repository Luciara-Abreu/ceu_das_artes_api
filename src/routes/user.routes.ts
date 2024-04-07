import { Request, Response, Router } from 'express';
import { UseService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';

const route = Router();

const userRepository = new UserRepository();
const userService = new UseService(userRepository);

route.get('/', async (req: Request, res: Response) => {
  try {
    const list = await userService.getAll();
    res.status(200).send(list);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

route.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await userService.getOne(id);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

route.post('/', async (req: Request, res: Response) => {
  try {
    await userService.create(req.body.name, req.body.email, req.body);
    res.status(200).send({ message: 'Usuário adicionado com sucesso!' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

route.patch('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await userService.update(id, req.body);
    res.status(200).send({ message: 'Usuário atualizado' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

route.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await userService.remove(id);
    res.status(200).send({ message: 'Usuário deletado com sucesso!' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

export default route;
