import { Request, Response } from 'express';
import { UserService } from '../service/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async list(req: Request, res: Response): Promise<Response> {
    const list = await this.userService.list();

    return res.status(200).send(list);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const user = await this.userService.show(id);

    return res.status(200).send(user);
  }

  async create(req: Request, res: Response): Promise<Response> {
    await this.userService.create(req.body);

    return res.status(200).send({ message: 'Usuário adicionado com sucesso!' });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    await this.userService.update(id, req.body);

    return res.status(200).send({ message: 'Usuário atualizado com sucesso!' });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    await this.userService.delete(id);

    return res.status(200).send({ message: 'Usuário excluído com sucesso!' });
  }
}
