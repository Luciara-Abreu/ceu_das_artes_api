import { IUserDTO } from '../dto/user.dto';
import { AuthRepository } from '../repository/auth.repository';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  createToken(user: IUserDTO) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { acessToken: token };
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.getByEmail(email);

    if (!user) throw new Error('Senha ou e-mail inválido.');

    if (!(await bcrypt.compare(password, user.password))) throw new Error('Senha ou e-mail inválido.');

    return this.createToken(user);
  }
}
