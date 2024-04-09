import { Request, Response, Router } from 'express';
import { DevolutionService } from '../service/devolution.service';
import { DevolutionRepository } from '../repository/devolution.repository';
import { BookRepository } from '../repository/book.repopsitory';
import { LocationRepository } from '../repository/location.repopsitory';

const route = Router();

const devolutionRepository = new DevolutionRepository();
const bookRepository = new BookRepository();
const locationRepopsitory = new LocationRepository();
const devolutionService = new DevolutionService(devolutionRepository, bookRepository, locationRepopsitory);

//listar todos
route.get('/', async (req: Request, res: Response) => {
  try {
    const devolutions = await devolutionService.getAll();
    res.status(200).send(devolutions);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//listar um
route.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const devolution = await devolutionService.getOne(id);
    res.status(200).send(devolution);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//add devolution
route.post('/', async (req: Request, res: Response) => {
  try {
    await devolutionService.create(req.body.bookId, req.body.userId, req.body);
    res.status(200).send({ message: 'Devolução efetuada com sucesso!' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//atualizar
route.patch('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await devolutionService.update(id, req.body);
    res.status(200).send({ message: 'Devolução atualizado com sucesso' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//deletar
route.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await devolutionService.remove(id);
    res.status(200).send({ message: 'Devolução deletado com sucesso!' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

export default route;
