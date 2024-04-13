import { IUserDTO } from '../dto/user.dto';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';

export class UserService {
  private repository = AppDataSource.getRepository(User);

  async getAll() {
    const list = await this.repository.find();
    if (list.length === 0 || !list.length) {
      throw new Error('A lista está vazia 👻');
    }

    return list;
  }

  async getOne(id: string) {
    const idUser = await this.repository.findOneBy({ id });
    if (!idUser) {
      throw new Error('Usuário não encontrado 👻');
    }

    return idUser;
  }

  async create(email: string, newUSer: IUserDTO) {
    const user = await this.repository.findOneBy({ email });
    if (user) throw new Error('Usuário já cadastrado');
    newUSer.password = await bcrypt.hash(newUSer.password, await bcrypt.genSalt());

    return await this.repository.save(newUSer);
  }

  async update(id: string, user: Partial<IUserDTO>) {
    const idUser = await this.repository.findOneBy({ id });
    if (!idUser) {
      throw new Error('Usuário não encontrado 👻');
    }
    const userUpdate = await this.repository.update({ id }, user);

    return userUpdate;
  }

  async remove(id: string) {
    const idUser = await this.repository.findOneBy({ id });
    if (!idUser) {
      throw new Error('Usuário não encontrado 👻');
    }

    await this.repository.delete({ id });
  }
}
