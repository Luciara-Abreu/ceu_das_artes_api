import { IUserDTO } from '../dto/user.dto';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';
import { NotFoundError, ConflictError } from '../helpers/api.error';

export class UserService {
  private repository = AppDataSource.getRepository(User);

  async list() {
    const list = await this.repository.find();
    if (list.length === 0 || !list.length) {
      throw new NotFoundError('A lista está vazia 👻');
    }

    return list;
  }

  async show(id: string) {
    const idUser = await this.repository.findOneBy({ id });
    if (!idUser) {
      throw new NotFoundError('Usuário não encontrado 👻');
    }

    return idUser;
  }

  async create(data: IUserDTO) {
    if (await this.repository.exists({ where: { email: data.email } })) throw new ConflictError('Usuário já cadastrado');

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    return await this.repository.save(data);
  }

  async update(id: string, user: Partial<IUserDTO>) {
    const idUser = await this.repository.findOneBy({ id });
    if (!idUser) {
      throw new NotFoundError('Usuário não encontrado 👻');
    }
    const userUpdate = await this.repository.update({ id }, user);

    return userUpdate;
  }

  async delete(id: string) {
    const idUser = await this.repository.findOneBy({ id });
    if (!idUser) {
      throw new NotFoundError('Usuário não encontrado 👻');
    }

    await this.repository.delete({ id });
  }
}
