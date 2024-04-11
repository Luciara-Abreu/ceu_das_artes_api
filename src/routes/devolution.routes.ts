import { Request, Response, Router } from 'express';
import { DevolutionService } from '../service/devolution.service';
import { DevolutionController } from '../controllers/devolution.controller';

const route = Router();

const devolutionService = new DevolutionService();
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
