import { Request, Response } from 'express';
import { LocationService } from '../service/location.service';

export class LocationController {
  constructor(private locationService: LocationService) {}

  async getAll(req: Request, res: Response) {
    try {
      const listLocations = await this.locationService.getAll();
      res.status(200).send(listLocations);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async getId(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const location = await this.locationService.getOne(id);
      res.status(200).send(location);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      await this.locationService.create(req.body.bookId, req.body.userId, req.body);
      res.status(200).send({ message: 'Locação efetuada com sucesso!' });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await this.locationService.update(id, req.body);
      res.status(200).send({ message: 'Locação atualizado com sucesso' });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await this.locationService.remove(id);
      res.status(200).send({ message: 'Locação deletado com sucesso!' });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
}
