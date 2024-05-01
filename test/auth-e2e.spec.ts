import request from 'supertest';
import { app } from '../src/app';
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { AppDataSource } from '../src/data-source';
import { Role } from '../src/helpers/enum';
import jwt from 'jsonwebtoken';

jest.mock('../src/providers/ethereal-mail.provider');

describe('AuthController (e2e)', () => {
  let connection: any;
  let accessToken: any;
  let userId: any;
  let resetToken: any;

  beforeAll(async () => {
    connection = await AppDataSource.initialize();
    userId = uuidV4();
    const password = await bcrypt.hash('inicial1234', await bcrypt.genSalt());
    const role = Role.Admin;

    connection.query(
      `INSERT INTO USERS(id, name, email, phone, role, password) VALUES('${userId}', 'Admin', 'admin@ceudasartes.com.br', '23242698', '${role}', '${password}')`,
    );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe('login method', () => {
    it('must be able to log in successfully', async () => {
      const response = await request(app).post('/login').send({
        email: 'admin@ceudasartes.com.br',
        password: 'inicial1234',
      });

      accessToken = response.body.accessToken;

      expect(response.statusCode).toEqual(200);
      expect(typeof response.body.accessToken).toEqual('string');
    });
  });

  describe('profile method', () => {
    it('must be able to see profile data', async () => {
      const response = await request(app).get('/login/profile').set('Authorization', `bearer ${accessToken}`);

      expect(response.statusCode).toEqual(200);
      expect(typeof response.body.id).toEqual('string');
      expect(response.body.role).toEqual(Role.Admin);
    });
  });

  describe('forget method', () => {
    it('must be able to send a password recovery email', async () => {
      const response = await request(app).post('/login/forget').send({ email: 'admin@ceudasartes.com.br' });
      resetToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

      expect(response.statusCode).toEqual(200);
      expect(response.body.message).toEqual('E-mail enviado com sucesso!');
    });
  });

  describe('reset method', () => {
    it('should be able to reset password successfully', async () => {
      const response = await request(app).post('/login/reset').send({
        password: '123@456',
        token: resetToken,
      });

      expect(response.statusCode).toEqual(200);
      expect(typeof response.body.accessToken).toEqual('string');
    });
  });
});
