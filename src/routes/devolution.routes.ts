import { Request, Response, Router } from 'express';
import { DevolutionService } from '../service/devolution.service';
import { DevolutionRepository } from '../repository/devolution.repository';
import { BookRepository } from '../repository/book.repopsitory';
import { LocationRepository } from '../repository/location.repopsitory';
import { DevolutionController } from '../controllers/devolution.controller';

const route = Router();

const devolutionRepository = new DevolutionRepository();
const bookRepository = new BookRepository();
const locationRepopsitory = new LocationRepository();
const devolutionService = new DevolutionService(devolutionRepository, bookRepository, locationRepopsitory);
const devolutionController = new DevolutionController(devolutionService);

route.get('/', async (req: Request, res: Response) => {
  return devolutionController.getAll(req, res);
});

route.get('/:id', async (req: Request, res: Response) => {
  return devolutionController.getId(req, res);
});

route.post('/', async (req: Request, res: Response) => {
  return devolutionController.create(req, res);
});

route.patch('/:id', async (req: Request, res: Response) => {
  return devolutionController.update(req, res);
});

route.delete('/:id', async (req: Request, res: Response) => {
  return devolutionController.delete(req, res);
});

export default route;
