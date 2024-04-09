import { IDevolutionDTO } from '../dto/devolution';
import { ILocationDTO } from '../dto/location.dto';
import { BookRepository } from '../repository/book.repopsitory';
import { DevolutionRepository } from '../repository/devolution.repository';
import { LocationRepository } from '../repository/location.repopsitory';

export class DevolutionService {
  constructor(
    private devolutionRepository: DevolutionRepository,
    private bookRepository: BookRepository,
    private locationRepopsitory: LocationRepository,
  ) {}

  async getAll() {
    const list = await this.devolutionRepository.getAll();
    if (list.length === 0 || !list.length) {
      throw new Error('A  lista de devolução está vazia 👻');
    }
    return list;
  }

  async getOne(id: string) {
    const idBook = await this.devolutionRepository.getById(id);
    if (!idBook) {
      throw new Error('Devolução não encontrada 👻');
    }
    return idBook;
  }

  async create(bookId: string, userId: string, newDevolution: IDevolutionDTO) {
    // 1. Obter informações do livro
    const book = await this.bookRepository.getById(bookId);

    // 2. Verificar se o livro foi encontrado
    if (!book) {
      throw new Error('Livro não encontrado');
    }

    // 3. Verificar se o usuário tem este livro locado
    const userLocation = await this.locationRepopsitory.getUserLocationByBookAndUser(bookId, userId);
    if (!userLocation) {
      throw new Error('O usuário não tem este livro locado');
    }

    // 4. Criar a devolução
    const createdDevolution = await this.devolutionRepository.create(newDevolution);

    // 5. Atualizar a quantidade disponível do livro
    book.booksInStock += 1;
    await this.bookRepository.update(bookId, { booksInStock: book.booksInStock });

    // 6. Atualizar o status da locação para "devolvido"
    const partialLocationUpdate: Partial<ILocationDTO> = { status: 'devolvido' };
    await this.locationRepopsitory.update(userLocation.id, partialLocationUpdate);

    return createdDevolution;
  }

  async update(id: string, location: Partial<ILocationDTO>) {
    const idLocation = await this.devolutionRepository.getById(id);
    if (!idLocation) {
      throw new Error('Locação não encontrada 👻');
    }
    const bookUpdate = this.devolutionRepository.update(id, location);
    return bookUpdate;
  }

  async remove(id: string) {
    const idLocation = await this.devolutionRepository.getById(id);
    if (!idLocation) {
      throw new Error('Locação não encontrado 👻');
    }
    await this.devolutionRepository.remove(id);
  }
}
