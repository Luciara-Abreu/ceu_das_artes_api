import { IUserDTO } from '../dto/user.dto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { resolve } from 'path';
import { EtherealMailProvider } from '../providers/ethereal-mail.provider';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';
import { validate as validateUUID } from 'uuid';

export class AuthService {
  private repository = AppDataSource.getRepository(User);

  constructor(private etherealMailProvider: EtherealMailProvider) {}

  createToken(user: IUserDTO) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { acessToken: token };
  }

  async login(email: string, password: string) {
    const user = await this.repository.findOneBy({ email });

    if (!user) throw new Error('Senha ou e-mail inválido.');

    if (!(await bcrypt.compare(password, user.password))) throw new Error('Senha ou e-mail inválido.');

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.repository.findOneBy({ email });

    if (!user) throw new Error('Email incorreto. Por favor, verifique o seu email e tente novamente.');

    const templatePath = resolve(__dirname, '..', 'templates', 'forgot.password.hbs');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_EMAIL_URL}${token}`,
    };

    await this.etherealMailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath);
  }

  async reset(password: string, token: string) {
    const data: any = jwt.verify(token, process.env.JWT_SECRET);

    if (!validateUUID(data.id)) throw new Error('Token não é valido');

    password = await bcrypt.hash(password, await bcrypt.genSalt());

    this.repository.update(data.id, { password });

    const id = data.id;

    const user = await this.repository.findOneBy({ id });

    return this.createToken(user);
  }
}
