import { IUserDTO } from '../dto/user.dto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { resolve } from 'path';
import { EtherealMailProvider } from '../providers/ethereal-mail.provider';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';
import { validate as validateUUID } from 'uuid';
import { BadRequestError } from '../helpers/api.error';

interface IResponse {
  accessToken: string;
}

export class AuthService {
  private repository = AppDataSource.getRepository(User);

  constructor(private etherealMailProvider: EtherealMailProvider) {}

  createToken(user: IUserDTO) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { accessToken: token };
  }

  async login(email: string, password: string): Promise<IResponse> {
    const user = await this.repository.findOneBy({ email });

    if (!user) throw new BadRequestError('Senha ou e-mail inválido.');

    if (!(await bcrypt.compare(password, user.password))) throw new BadRequestError('Senha ou e-mail inválido.');

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.repository.findOneBy({ email });

    if (!user) throw new BadRequestError('Email incorreto. Por favor, verifique o seu email e tente novamente.');

    const templatePath = resolve(__dirname, '..', 'templates', 'forgot.password.hbs');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_EMAIL_URL}${token}`,
    };

    await this.etherealMailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath);
  }

  async reset(password: string, token: string): Promise<IResponse> {
    const data = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if (!validateUUID(data.id)) throw new BadRequestError('Token não é valido');

    password = await bcrypt.hash(password, await bcrypt.genSalt());

    await this.repository.update(data.id, { password });

    const id = data.id;
    const user = await this.repository.findOneBy({ id });

    return this.createToken(user);
  }
}
