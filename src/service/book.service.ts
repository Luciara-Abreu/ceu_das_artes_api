import { AppDataSource } from '../data-source';
import { IBookDTO } from '../dto/book.dto';
import { Book } from '../entity/book.entity';
import { NotFoundError, ConflictError } from '../helpers/api.error';

export class BookService {
  private bookRepopsitory = AppDataSource.getRepository(Book);

  async list() {
    const list = await this.bookRepopsitory.find();
    if (list.length === 0 || !list.length) {
      throw new NotFoundError('A lista está vazia 👻');
    }

    return list;
  }

  async show(id: string) {
    const idBook = await this.bookRepopsitory.findOneBy({ id });
    if (!idBook) {
      throw new NotFoundError('Livro não encontrado 👻');
    }

    return idBook;
  }

  async create(title: string, author: string, newBook: IBookDTO) {
    const book = await this.bookRepopsitory.findBy({ title, author });

    book.forEach((thisBook) => {
      if (thisBook.title === title && thisBook.author === author) {
        throw new ConflictError('Livro já cadastrado');
      }
    });

    return this.bookRepopsitory.save(newBook);
  }

  async update(id: string, book: Partial<IBookDTO>) {
    const idBook = await this.bookRepopsitory.findOneBy({ id });
    if (!idBook) {
      throw new NotFoundError('Livro não encontrado 👻');
    }
    const bookUpdate = this.bookRepopsitory.update(id, book);

    return bookUpdate;
  }

  async remove(id: string) {
    const idBook = await this.bookRepopsitory.findOneBy({ id });
    if (!idBook) {
      throw new NotFoundError('Livro não encontrado 👻');
    }

    await this.bookRepopsitory.delete({ id });
  }
}
