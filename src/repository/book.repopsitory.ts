import { AppDataSource } from '../data-source';
import { IBookDTO } from '../dto/book.dto';
import { Book } from '../entity/book.entity';

const repository = AppDataSource.getRepository(Book);

export class BookRepository {
  async getAll() {
    return await repository.find();
  }

  async getById(id: string) {
    return await repository.findOneBy({ id });
  }

  async getByTitle(title: string) {
    return await repository.findOneBy({ title });
  }

  async getByAuthor(author: string) {
    return await repository.findOneBy({ author });
  }

  async getByQuantityBook(quantityBook: number) {
    return await repository.findOneBy({ quantityBook });
  }

  async getByYearPublication(yearPublication: Date) {
    return await repository.findOneBy({ yearPublication });
  }

  async getByGenre(genre: string) {
    return await repository.findOneBy({ genre });
  }

  async create(book: IBookDTO) {
    return await repository.create(book);
  }

  async update(id: string, book: Partial<IBookDTO>) {
    return await repository.update({ id }, book);
  }

  async remove(id: string) {
    return await repository.delete({ id });
  }
}
