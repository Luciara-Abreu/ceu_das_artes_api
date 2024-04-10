import { Request, Response, Router } from 'express';
import { LocationRepository } from '../repository/location.repopsitory';
import { LocationService } from '../service/location.service';
import { BookRepository } from '../repository/book.repopsitory';
import { LocationController } from '../controllers/location.controller';

const route = Router();

const locationRepopsitory = new LocationRepository();
const bookRepository = new BookRepository();
const locationService = new LocationService(locationRepopsitory, bookRepository);
const locationController = new LocationController(locationService);

route.get('/', async (req: Request, res: Response) => {
  return locationController.getAll(req, res);
});

route.get('/:id', async (req: Request, res: Response) => {
  return locationController.getId(req, res);
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
