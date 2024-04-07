import { AppDataSource } from '../data-source';
import { IUserDTO } from '../dto/user.dto';
import { User } from '../entity/user.entity';

const repository = AppDataSource.getRepository(User);

export class UserRepository {
  async list() {
    const users = await repository.find();
    return users;
  }

  async getById(id: string) {
    return await repository.findOneBy({ id });
  }

  async getByName(name: string) {
    return await repository.findOneBy({ name });
  }

  async getByEmail(email: string) {
    return await repository.findOneBy({ email });
  }
  async getByFone(fone: string) {
    return await repository.findOneBy({ fone });
  }

  async create(user: IUserDTO) {
    const newUser = repository.create(user);
    return await repository.save(newUser);
  }

  async update(id: string, user: Partial<IUserDTO>) {
    return await repository.update({ id }, user);
  }

  remove(id: string) {
    return repository.delete({ id });
  }
}
