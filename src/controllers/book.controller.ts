import { Request, Response } from 'express';
import { BookService } from '../service/book.service';

export class BookController {
  constructor(private bookService: BookService) {}

  async getAll(req: Request, res: Response) {
    try {
      const listBooks = await this.bookService.list();
      res.status(200).send(listBooks);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async getId(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const book = await this.bookService.show(id);
      res.status(200).send(book);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    await this.bookService.create(req.body.title, req.body.author, req.body);

    return res.status(200).send({ message: 'Livro adicionado com sucesso!' });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    await this.bookService.update(id, req.body);

    return res.status(200).send({ message: 'Livro atualizado com sucesso' });
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    await this.bookService.remove(id);

    return res.status(200).send({ message: 'Livro deletado com sucesso!' });
  }
}
