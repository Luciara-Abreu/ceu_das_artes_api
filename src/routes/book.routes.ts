import { Request, Response, Router } from 'express';
import { BookService } from '../service/book.service';
import { BookRepository } from '../repository/book.repopsitory';

const route = Router();

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);

//listar todos
route.get('/', async (req: Request, res: Response) => {
  try {
    const listBooks = await bookService.getAll();
    res.status(200).send(listBooks);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//listar um
route.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const book = await bookService.getOne(id);
    res.status(200).send(book);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//add book
route.post('/', async (req: Request, res: Response) => {
  try {
    await bookService.create(req.body.title, req.body.author, req.body);
    res.status(200).send({ message: 'Livro adicionado com sucesso!' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//atualizar
route.patch('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await bookService.update(id, req.body);
    res.status(200).send({ message: 'Livro atualizado com sucesso' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

//deletar
route.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await bookService.remove(id);
    res.status(200).send({ message: 'Livro deletado com sucesso!' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

export default route;
