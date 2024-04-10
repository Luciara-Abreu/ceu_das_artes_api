import { Request, Response, Router } from 'express';
import { BookService } from '../service/book.service';
import { BookRepository } from '../repository/book.repopsitory';
import { BookController } from '../controllers/book.controller';

const route = Router();

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

route.get('/', async (req: Request, res: Response) => {
  return bookController.getAll(req, res);
});

route.get('/:id', async (req: Request, res: Response) => {
  return bookController.getId(req, res);
});

route.post('/', async (req: Request, res: Response) => {
  return bookController.create(req, res);
});

route.patch('/:id', async (req: Request, res: Response) => {
  return bookController.update(req, res);
});

route.delete('/:id', async (req: Request, res: Response) => {
  return bookController.update(req, res);
});

export default route;
