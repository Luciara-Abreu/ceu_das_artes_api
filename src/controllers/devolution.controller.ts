import { Request, Response } from 'express';
import { DevolutionService } from '../service/devolution.service';

export class DevolutionController {
  constructor(private devolutionService: DevolutionService) {}

  async getAll(req: Request, res: Response) {
    try {
      const devolutions = await this.devolutionService.getAll();
      res.status(200).send(devolutions);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  //listar um
  async getId(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const devolution = await this.devolutionService.getOne(id);
      res.status(200).send(devolution);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  //add devolution
  async create(req: Request, res: Response) {
    try {
      await this.devolutionService.create(req.body.bookId, req.body.userId, req.body);
      res.status(200).send({ message: 'Devolução efetuada com sucesso!' });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  //atualizar
  async update(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await this.devolutionService.update(id, req.body);
      res.status(200).send({ message: 'Devolução atualizado com sucesso' });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  //deletar
  async delete(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await this.devolutionService.remove(id);
      res.status(200).send({ message: 'Devolução deletado com sucesso!' });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
}
