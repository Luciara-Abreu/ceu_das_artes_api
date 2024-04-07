import { UserRepository } from '../repository/user.repository';
import { IUserDTO } from '../dto/user.dto';

export class UseService {
  constructor(private userRepository: UserRepository) {}

  async getAll() {
    const list = await this.userRepository.list();
    if (list.length === 0 || !list.length) {
      throw new Error('A lista está vazia 👻');
    }
    return list;
  }

  async getOne(id: string) {
    const idUser = await this.userRepository.getById(id);
    if (!idUser) {
      throw new Error('Usuário não encontrado 👻');
    }
    return idUser;
  }

  async create(name: string, email: string, newUSer: IUserDTO) {
    const userName = await this.userRepository.getByName(name);
    const userEmail = await this.userRepository.getByEmail(email);

    if (!userName) {
      if (userEmail) {
        throw new Error('Usuário já cadastrado');
      }
      return this.userRepository.create(newUSer);
    } else {
      throw new Error('Usuário já cadastrado');
    }
  }

  async update(id: string, user: Partial<IUserDTO>) {
    const idUser = await this.userRepository.getById(id);
    if (!idUser) {
      throw new Error('Usuário não encontrado 👻');
    }
    const userUpdate = this.userRepository.update(id, user);
    return userUpdate;
  }

  async remove(id: string) {
    const idUser = await this.userRepository.getById(id);
    if (!idUser) {
      throw new Error('Usuário não encontrado 👻');
    }
    await this.userRepository.remove(id);
  }
}
