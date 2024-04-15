import { Request, Response } from 'express';
import { UserService } from '../service/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async list(req: Request, res: Response) {
    const list = await this.userService.list();

    return res.status(200).send(list);
  }

  async show(req: Request, res: Response) {
    const id = req.params.id;
    const user = await this.userService.show(id);

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
