import { Request, Response } from 'express';
import { UserService } from '../service/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async getAll(req: Request, res: Response) {
    try {
      const list = await this.userService.getAll();
      res.status(200).send(list);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async getId(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const user = await this.userService.getOne(id);
      res.status(200).send(user);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      await this.userService.create(req.body.email, req.body);
      res.status(200).send({ message: 'Usuário adicionado com sucesso!' });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await this.userService.update(id, req.body);
      res.status(200).send({ message: 'Usuário atualizado' });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await this.userService.remove(id);
      res.status(200).send({ message: 'Usuário deletado com sucesso!' });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
}
