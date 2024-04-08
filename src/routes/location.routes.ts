import { Request, Response, Router } from 'express';
import { LocationRepository } from '../repository/location.repopsitory';
import { LocationService } from '../service/location.service';
import { BookRepository } from '../repository/book.repopsitory';

const route = Router();

const locationRepopsitory = new LocationRepository();
const bookRepository = new BookRepository();
const locationService = new LocationService(locationRepopsitory, bookRepository);

//listar todos
route.get('/', async (req: Request, res: Response) => {
  try {
    const listLocations = await locationService.getAll();
    res.status(200).send(listLocations);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//listar um
route.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const location = await locationService.getOne(id);
    res.status(200).send(location);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//add location
route.post('/', async (req: Request, res: Response) => {
  try {
    await locationService.create(req.body.bookId, req.body.userId, req.body);
    res.status(200).send({ message: 'Locação efetuada com sucesso!' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//atualizar
route.patch('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await locationService.update(id, req.body);
    res.status(200).send({ message: 'Locação atualizado com sucesso' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//deletar
route.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await locationService.remove(id);
    res.status(200).send({ message: 'Locação deletado com sucesso!' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

export default route;
