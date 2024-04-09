import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';

const repository = AppDataSource.getRepository(User);

export class AuthRepository {
  async getByEmail(email: string) {
    return await repository.findOneBy({ email });
  }

  async getById(id: string) {
    return await repository.findOneBy({ id });
  }
}
