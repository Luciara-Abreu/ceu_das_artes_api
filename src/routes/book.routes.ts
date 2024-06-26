import { Request, Response, Router } from 'express';
import { BookService } from '../service/book.service';
import { BookController } from '../controllers/book.controller';

const route = Router();

const bookService = new BookService();
const bookController = new BookController(bookService);

route.get('/', async (req: Request, res: Response) => {
  return bookController.list(req, res);
});

route.get('/:id', async (req: Request, res: Response) => {
  return bookController.show(req, res);
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
