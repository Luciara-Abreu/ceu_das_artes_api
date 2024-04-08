import { ILocationDTO } from '../dto/location.dto';
import { BookRepository } from '../repository/book.repopsitory';
import { LocationRepository } from '../repository/location.repopsitory';

export class LocationService {
  constructor(
    private locationRepopsitory: LocationRepository,
    private bookRepository: BookRepository,
  ) {}

  async getAll() {
    const list = await this.locationRepopsitory.getAll();
    if (list.length === 0 || !list.length) {
      throw new Error('A lista está vazia 👻');
    }
    return list;
  }

  async getOne(id: string) {
    const idBook = await this.locationRepopsitory.getById(id);
    if (!idBook) {
      throw new Error('Locação não encontrada 👻');
    }
    return idBook;
  }

  async create(bookId: string, userId: string, newLocation: ILocationDTO) {
    // 1. Obter informações do livro
    const book = await this.bookRepository.getById(bookId);

    // 2. Verificar se o livro foi encontrado
    if (!book) {
      throw new Error('Livro não encontrado');
    }

    // 3. Verificar se o livro está disponível
    if (book.booksInStock <= 0) {
      throw new Error('Livro não disponível para locação');
    }

    // 4. Verificar se o usuário já tem livros locados
    const userLocationsCount = await this.locationRepopsitory.getUserLocationsCount(userId);

    // 5. Verificar se o usuário pode locar mais livros
    if (userLocationsCount >= 3) {
      throw new Error('Usuário já locou o máximo de livros permitidos');
    }

    const userLocationBook = await this.locationRepopsitory.getByBookId(bookId);
    // 6. Verificar se o usuário já não locou o mesmo livro
    if (userLocationsCount && userLocationBook) {
      throw new Error('Livro já está locado para esse leitor!!');
    }

    // 6. Criar a locação
    const createdLocation = await this.locationRepopsitory.create(newLocation);

    // 7. Atualizar a quantidade disponível do livro
    book.booksInStock -= 1; // Reduz o número de livros disponíveis
    await this.bookRepository.update(bookId, { booksInStock: book.booksInStock });

    return createdLocation;
  }

  async update(id: string, location: Partial<ILocationDTO>) {
    const idLocation = await this.locationRepopsitory.getById(id);
    if (!idLocation) {
      throw new Error('Locação não encontrada 👻');
    }
    const bookUpdate = this.locationRepopsitory.update(id, location);
    return bookUpdate;
  }

  async remove(id: string) {
    const idLocation = await this.locationRepopsitory.getById(id);
    if (!idLocation) {
      throw new Error('Locação não encontrado 👻');
    }
    await this.locationRepopsitory.remove(id);
  }
}
