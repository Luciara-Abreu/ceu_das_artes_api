import { Request, Response } from 'express';
import { DevolutionService } from '../service/devolution.service';

export class DevolutionController {
  constructor(private devolutionService: DevolutionService) {}

  async getAll(req: Request, res: Response) {
    try {
      const devolutions = await this.devolutionService.list();
      res.status(200).send(devolutions);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }

    return res.status(200).send(devolutions);
  }

  //listar um
  async getId(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const devolution = await this.devolutionService.show(id);
      res.status(200).send(devolution);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }

    return res.status(200).send(devolution);
  }

  //add devolution
  async create(req: Request, res: Response) {
    await this.devolutionService.create(req.body.bookId, req.body.userId, req.body);

    return res.status(200).send({ message: 'Devolução efetuada com sucesso!' });
  }

  //atualizar
  async update(req: Request, res: Response) {
    const id = req.params.id;
    await this.devolutionService.update(id, req.body);

    return res.status(200).send({ message: 'Devolução atualizado com sucesso' });
  }

  //deletar
  async delete(req: Request, res: Response) {
    const id = req.params.id;
    await this.devolutionService.remove(id);

    return res.status(200).send({ message: 'Devolução deletado com sucesso!' });
  }
}
