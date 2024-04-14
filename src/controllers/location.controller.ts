import { Request, Response } from 'express';
import { LocationService } from '../service/location.service';

export class LocationController {
  constructor(private locationService: LocationService) {}

  async getAll(req: Request, res: Response) {
    try {
      const listLocations = await this.locationService.list();
      res.status(200).send(listLocations);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }

    return res.status(200).send(listLocations);
  }

  async getId(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const location = await this.locationService.show(id);
      res.status(200).send(location);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }

    return res.status(200).send(location);
  }

  async create(req: Request, res: Response) {
    await this.locationService.create(req.body.bookId, req.body.userId, req.body);

    return res.status(200).send({ message: 'Locação efetuada com sucesso!' });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    await this.locationService.update(id, req.body);

    return res.status(200).send({ message: 'Locação atualizado com sucesso' });
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    await this.locationService.remove(id);

    return res.status(200).send({ message: 'Locação deletado com sucesso!' });
  }
}
