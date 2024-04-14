import { Request, Response } from 'express';
import { UserService } from '../service/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async getAll(req: Request, res: Response) {
    try {
      const list = await this.userService.list();
      res.status(200).send(list);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }

    return res.status(200).send(list);
  }

  async getId(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const user = await this.userService.show(id);
      res.status(200).send(user);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }

    return res.status(200).send(user);
  }

  async create(req: Request, res: Response) {
    await this.userService.create(req.body.email, req.body);

    return res.status(200).send({ message: 'Usuário adicionado com sucesso!' });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    await this.userService.update(id, req.body);

    return res.status(200).send({ message: 'Usuário atualizado' });
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    await this.userService.remove(id);

    return res.status(200).send({ message: 'Usuário deletado com sucesso!' });
  }
}
