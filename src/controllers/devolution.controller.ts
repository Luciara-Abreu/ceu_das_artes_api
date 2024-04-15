import { Request, Response } from 'express';
import { DevolutionService } from '../service/devolution.service';

export class DevolutionController {
  constructor(private devolutionService: DevolutionService) {}

  async list(req: Request, res: Response) {
    const devolutions = await this.devolutionService.list();

    return res.status(200).send(devolutions);
  }

  async show(req: Request, res: Response) {
    const id = req.params.id;
    const devolution = await this.devolutionService.show(id);

    return res.status(200).send(devolution);
  }

  async create(req: Request, res: Response) {
    await this.devolutionService.create(req.body.bookId, req.body.userId, req.body);

    return res.status(200).send({ message: 'Devolução efetuada com sucesso!' });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    await this.devolutionService.update(id, req.body);

    return res.status(200).send({ message: 'Devolução atualizado com sucesso' });
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    await this.devolutionService.remove(id);

    return res.status(200).send({ message: 'Devolução deletado com sucesso!' });
  }
}
