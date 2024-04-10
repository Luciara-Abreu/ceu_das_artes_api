import { IBookDTO } from '../dto/book.dto';
import { BookRepository } from '../repository/book.repopsitory';

export class BookService {
  constructor(private bookRepopsitory: BookRepository) {}

  async getAll() {
    const list = await this.bookRepopsitory.getAll();
    if (list.length === 0 || !list.length) {
      throw new Error('A lista está vazia 👻');
    }
    return list;
  }

  async getOne(id: string) {
    const idBook = await this.bookRepopsitory.getById(id);
    if (!idBook) {
      throw new Error('Livro não encontrado 👻');
    }
    return idBook;
  }

  async create(title: string, author: string, newBook: IBookDTO) {
    const bookName = await this.bookRepopsitory.getByTitle(title);
    const bookAuthor = await this.bookRepopsitory.getByAuthor(author);

    if (bookName && bookAuthor) {
      throw new Error('Livro já cadastrado');
    }
    return this.bookRepopsitory.create(newBook);
  }

  async update(id: string, book: Partial<IBookDTO>) {
    const idBook = await this.bookRepopsitory.getById(id);
    if (!idBook) {
      throw new Error('Livro não encontrado 👻');
    }
    const bookUpdate = this.bookRepopsitory.update(id, book);
    return bookUpdate;
  }

  async remove(id: string) {
    const idBook = await this.bookRepopsitory.getById(id);
    if (!idBook) {
      throw new Error('Livro não encontrado 👻');
    }
    await this.bookRepopsitory.remove(id);
  }
}
