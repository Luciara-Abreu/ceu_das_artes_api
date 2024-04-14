import { AppDataSource } from '../data-source';
import { IDevolutionDTO } from '../dto/devolution';
import { ILocationDTO } from '../dto/location.dto';
import { Book } from '../entity/book.entity';
import { Devolution } from '../entity/devolution.entity';
import { Location } from '../entity/location.entity';

export class DevolutionService {
  private bookRepository = AppDataSource.getRepository(Book);
  private locationRepopsitory = AppDataSource.getRepository(Location);
  private devolutionRepository = AppDataSource.getRepository(Devolution);

  async list() {
    const list = await this.devolutionRepository.find();
    if (list.length === 0 || !list.length) {
      throw new Error('A  lista de devolução está vazia 👻');
    }

    return list;
  }

  async show(id: string) {
    const idBook = await this.devolutionRepository.findOneBy({ id });
    if (!idBook) {
      throw new Error('Devolução não encontrada 👻');
    }

    return idBook;
  }

  async create(bookId: string, userId: string, newDevolution: IDevolutionDTO) {
    const id = bookId;
    // 1. Obter informações do livro
    const book = await this.bookRepository.findOneBy({ id });

    // 2. Verificar se o livro foi encontrado
    if (!book) {
      throw new Error('Livro não encontrado');
    }

    // 3. Verificar se o usuário tem este livro locado
    const userLocation = await this.locationRepopsitory.findBy({ bookId, userId });
    if (userLocation.length === 0) {
      throw new Error('O usuário não tem este livro locado!!');
    }

    for (const location of userLocation) {
      if (location.userId === userId && location.status === 'devolvido') {
        throw new Error('O usuário não tem este livro locado!!');
      }

      // 4. Criar a devolução
      const createdDevolution = await this.devolutionRepository.save(newDevolution);

      // 5. Atualizar a quantidade disponível do livro
      book.booksInStock += 1;
      await this.bookRepository.update(id, { booksInStock: book.booksInStock });

      // 6. Atualizar o status da locação para "devolvido"
      const partialLocationUpdate: Partial<ILocationDTO> = { status: 'devolvido' };
      await this.locationRepopsitory.update(location.id, partialLocationUpdate);

      return createdDevolution;
    }
  }

  async update(id: string, location: Partial<ILocationDTO>) {
    const idLocation = await this.devolutionRepository.findOneBy({ id });
    if (!idLocation) {
      throw new Error('Locação não encontrada 👻');
    }
    const bookUpdate = this.devolutionRepository.update(id, location);

    return bookUpdate;
  }

  async remove(id: string) {
    const idLocation = await this.devolutionRepository.findOneBy({ id });
    if (!idLocation) {
      throw new Error('Locação não encontrado 👻');
    }

    await this.devolutionRepository.delete({ id });
  }
}
