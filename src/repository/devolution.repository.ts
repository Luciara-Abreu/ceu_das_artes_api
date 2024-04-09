import { AppDataSource } from '../data-source';
import { IDevolutionDTO } from '../dto/devolution';
import { Devolution } from '../entity/devolution';

const repository = AppDataSource.getRepository(Devolution);

export class DevolutionRepository {
  async getAll() {
    return repository.find();
  }

  async getById(id: string) {
    return repository.findOneBy({ id });
  }

  async getByBookId(bookId: string) {
    return repository.findOneBy({ bookId });
  }

  async getByUserId(userId: string) {
    return repository.findOneBy({ userId });
  }

  async create(devolution: IDevolutionDTO) {
    const newDevolution = repository.create(devolution);
    return await repository.save(newDevolution);
  }

  async update(id: string, book: Partial<IDevolutionDTO>) {
    return repository.update({ id }, book);
  }

  async remove(id: string) {
    return repository.delete({ id });
  }

  async getUserdevolutionsCount(userId: string) {
    // Usar countDocuments para contar o número de documentos que correspondem ao ID do usuário
    return repository.countBy({ userId });
  }
}
