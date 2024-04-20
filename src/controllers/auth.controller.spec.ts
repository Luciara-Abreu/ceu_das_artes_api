import { AuthController } from './auth.controller';
import { userListMock } from '../helpers/mocks/user.list.mock';
import { AuthServiceMock } from '../helpers/mocks/auth.service.mock';
import { reqMock } from '../helpers/mocks/req.mock';
import { resMock } from '../helpers/mocks/res.mock';

describe('AuthController', () => {
  let authController: AuthController;
  let authServiceMock: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    req = reqMock;
    res = resMock;
    authServiceMock = AuthServiceMock;
    authController = new AuthController(authServiceMock);
  });

  it('must be able to validate the definition', () => {
    expect(authServiceMock).toBeDefined();
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('must be able to return user data on successful login', async () => {
      const userData = userListMock[0];
      authServiceMock.login.mockResolvedValue(userData);
      req.body.email = 'john.doe@example.com.br';
      req.body.password = '$2b$10$2pbaCVzDPD4oB9cIZQTJcOyY5/p23czVnMkSckViVJfxi6n8UPyu2';

      await authController.login(req, res);

      expect(authServiceMock.login).toHaveBeenCalledWith('john.doe@example.com.br', '$2b$10$2pbaCVzDPD4oB9cIZQTJcOyY5/p23czVnMkSckViVJfxi6n8UPyu2');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(userData);
    });
  });

  describe('profile', () => {
    it('must be able to return user data stored in req.user', async () => {
      const userData = userListMock[0];
      req.user = userData;

      await authController.profile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(userData);
    });
  });

  describe('forget', () => {
    it('must be able to send success message after forgetting password', async () => {
      req.body.email = 'john.doe@example.com.br';

      await authController.forget(req, res);

      expect(authServiceMock.forget).toHaveBeenCalledWith('john.doe@example.com.br');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'E-mail enviado com sucesso!' });
    });
  });

  describe('reset', () => {
    it('must be able to return user data after resetting password', async () => {
      const userData = userListMock[0];
      authServiceMock.reset.mockResolvedValue(userData);
      req.body.password = '123@456';
      req.body.token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxODI4MDcwLTgxZDAtNDg0ZS04MjY1LWY3OTQ4ZmFhNmM1YiIsImlhdCI6MTcxMzQ4MDk5MiwiZXhwIjoxNzEzNDg0NTkyfQ.ekJZoiTv246AHb3kWxHw4rxGMFj7ir5N6aSd3gWMsxk';

      await authController.reset(req, res);

      expect(authServiceMock.reset).toHaveBeenCalledWith(
        '123@456',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxODI4MDcwLTgxZDAtNDg0ZS04MjY1LWY3OTQ4ZmFhNmM1YiIsImlhdCI6MTcxMzQ4MDk5MiwiZXhwIjoxNzEzNDg0NTkyfQ.ekJZoiTv246AHb3kWxHw4rxGMFj7ir5N6aSd3gWMsxk',
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(userData);
    });
  });
});
