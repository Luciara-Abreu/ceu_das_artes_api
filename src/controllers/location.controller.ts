import { Request, Response } from 'express';
import { LocationService } from '../service/location.service';

export class LocationController {
  constructor(private locationService: LocationService) {}

  async getAll(req: Request, res: Response) {
    const listLocations = await this.locationService.getAll();

    return res.status(200).send(listLocations);
  }

  async getId(req: Request, res: Response) {
    const id = req.params.id;
    const location = await this.locationService.getOne(id);

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
