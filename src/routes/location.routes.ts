import { Request, Response, Router } from 'express';
import { LocationService } from '../service/location.service';
import { LocationController } from '../controllers/location.controller';

const route = Router();

const locationService = new LocationService();
const locationController = new LocationController(locationService);

route.get('/', async (req: Request, res: Response) => {
  return locationController.list(req, res);
});

route.get('/:id', async (req: Request, res: Response) => {
  return locationController.show(req, res);
});

route.post('/', async (req: Request, res: Response) => {
  return locationController.create(req, res);
});

route.patch('/:id', async (req: Request, res: Response) => {
  return locationController.update(req, res);
});

route.delete('/:id', async (req: Request, res: Response) => {
  return locationController.delete(req, res);
});

export default route;
