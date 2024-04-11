import { AppDataSource } from '../data-source';
import { ILocationDTO } from '../dto/location.dto';
import { Book } from '../entity/book.entity';
import { Location } from '../entity/location.entity';

export class LocationService {
  private locationRepopsitory = AppDataSource.getRepository(Location);
  private bookRepository = AppDataSource.getRepository(Book);

  async getAll() {
    const list = await this.locationRepopsitory.find();
    if (list.length === 0 || !list.length) {
      throw new Error('A lista está vazia 👻');
    }

    return list;
  }

  async getOne(id: string) {
    const idBook = await this.locationRepopsitory.findOneBy({ id });
    if (!idBook) {
      throw new Error('Locação não encontrada 👻');
    }

    return idBook;
  }

  async create(bookId: string, userId: string, newLocation: ILocationDTO) {
    const id = bookId;
    // 1. Obter informações do livro
    const book = await this.bookRepository.findOneBy({ id });

    // 2. Verificar se o livro foi encontrado
    if (!book) {
      throw new Error('Livro não encontrado');
    }

    // 3. Verificar se o livro está disponível
    if (book.booksInStock <= 0) {
      throw new Error('Livro não disponível para locação');
    }

    // 4. Verificar se o usuário já tem + de 3 livros locados
    const userLocationsCount = await this.locationRepopsitory.countBy({ userId });
    if (userLocationsCount >= 3) {
      throw new Error('Usuário já locou o máximo de livros permitidos');
    }

    const userLocation = await this.locationRepopsitory.findBy({ bookId });
    userLocation.forEach((Location) => {
      if (Location.userId === userId && Location.status != 'devolvido') {
        throw new Error('Livro já está locado para esse leitor !!');
      }
    });

    // 5. Criar a locação
    const createdLocation = await this.locationRepopsitory.save(newLocation);

    // 6. Atualizar a quantidade disponível do livro
    book.booksInStock -= 1; // Reduz o número de livros disponíveis
    await this.bookRepository.update(id, { booksInStock: book.booksInStock });

    return createdLocation;
  }

  async update(id: string, location: Partial<ILocationDTO>) {
    const idLocation = await this.locationRepopsitory.findOneBy({ id });
    if (!idLocation) {
      throw new Error('Locação não encontrada 👻');
    }
    const bookUpdate = this.locationRepopsitory.update(id, location);

    return bookUpdate;
  }

  async remove(id: string) {
    const idLocation = await this.locationRepopsitory.findOneBy({ id });
    if (!idLocation) {
      throw new Error('Locação não encontrado 👻');
    }

    await this.locationRepopsitory.delete({ id });
  }
}
