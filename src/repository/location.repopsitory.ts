import { AppDataSource } from '../data-source';
import { ILocationDTO } from '../dto/location.dto';
import { Location } from '../entity/location.entity';

const repository = AppDataSource.getRepository(Location);

export class LocationRepository {
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

  async getBytakeOnDate(takeOnDate: Date) {
    return repository.findOneBy({ takeOnDate });
  }

  async getByDevolutionDate(devolutionDate: Date) {
    return repository.findOneBy({ devolutionDate });
  }

  async create(location: ILocationDTO) {
    const newLocation = repository.create(location);
    return await repository.save(newLocation);
  }

  async update(id: string, book: Partial<ILocationDTO>) {
    return repository.update({ id }, book);
  }

  async remove(id: string) {
    return repository.delete({ id });
  }

  async getUserLocationsCount(userId: string) {
    // Usar countDocuments para contar o número de documentos que correspondem ao ID do usuário
    return repository.countBy({ userId });
  }

  async getUserLocationByBookAndUser(bookId: string, userId: string) {
    return repository.findOneBy({ bookId, userId });
  }
}
