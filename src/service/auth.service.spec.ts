import { EtherealMailProvider } from '../providers/ethereal-mail.provider';
import { BadRequestError } from '../helpers/api.error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { IUserDTO } from '../dto/user.dto';
import { tokenMock } from '../helpers/mocks/token.mock';
import { repositoryMock } from '../helpers/mocks/repository.mock';
import { userListMock } from '../helpers/mocks/user.list.mock';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../providers/ethereal-mail.provider');
jest.mock('../data-source', () => ({
  AppDataSource: {
    getRepository: () => repositoryMock,
  },
}));

describe('AuthService', () => {
  let authService: AuthService;
  let etherealMailProviderMock: EtherealMailProvider;

  beforeEach(() => {
    etherealMailProviderMock = new EtherealMailProvider();
    authService = new AuthService(etherealMailProviderMock);
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('must be able to throw BadRequestError when email is not found', async () => {
      repositoryMock.findOneBy.mockResolvedValueOnce(null);

      await expect(authService.login('nonexistent@example.com', 'password')).rejects.toThrow(BadRequestError);
    });

    it('must be able to throw BadRequestError when password is incorrect', async () => {
      const user: IUserDTO = userListMock[0];

      repositoryMock.findOneBy.mockResolvedValueOnce(user);

      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

      await expect(authService.login('test@example.com', 'incorrectPassword')).rejects.toThrow(BadRequestError);
    });

    it('must be able to return an access token when login is successful', async () => {
      const user: IUserDTO = userListMock[0];

      repositoryMock.findOneBy.mockResolvedValueOnce(user);

      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      (jwt.sign as jest.Mock).mockReturnValueOnce('accessToken');

      const result = await authService.login('test@example.com', 'password');

      expect(result).toEqual({ accessToken: 'accessToken' });
    });
  });

  describe('forget', () => {
    it('must be able to throw BadRequestError when email is not found', async () => {
      repositoryMock.findOneBy.mockResolvedValueOnce(null);

      await expect(authService.forget('nonexistent@example.com')).rejects.toThrow(BadRequestError);
    });

    it('must be able to send a reset email when email is found', async () => {
      const user: IUserDTO = userListMock[0];

      repositoryMock.findOneBy.mockResolvedValueOnce(user);

      await authService.forget('test@example.com');

      expect(etherealMailProviderMock.sendMail).toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    it('must be able to throw BadRequestError when token is invalid', async () => {
      const invalidToken = 'invalidToken';

      (jwt.verify as jest.Mock).mockImplementationOnce(() => {
        throw new BadRequestError('Token não é valido');
      });

      await expect(authService.reset('newPassword', invalidToken)).rejects.toThrow(BadRequestError);
    });

    it('must be able to throw BadRequestError when token is not a UUID', async () => {
      const invalidToken = 'invalidToken';
      (jwt.verify as jest.Mock).mockReturnValueOnce({ id: 'invalidID' });

      await expect(authService.reset('newPassword', invalidToken)).rejects.toThrow(BadRequestError);
    });

    it('must be able to update user password and return access token when token is valid.', async () => {
      const validToken = tokenMock.accessToken;
      const user: IUserDTO = userListMock[0];

      (jwt.verify as jest.Mock).mockReturnValueOnce({ id: user.id });

      repositoryMock.findOneBy.mockResolvedValueOnce(user);

      (bcrypt.hash as jest.Mock).mockResolvedValueOnce('newHashedPassword');
      (jwt.sign as jest.Mock).mockReturnValueOnce('newAccessToken');

      const result = await authService.reset('newPassword', validToken);

      expect(repositoryMock.update).toHaveBeenCalledWith(user.id, { password: 'newHashedPassword' });
      expect(result).toEqual({ accessToken: 'newAccessToken' });
    });
  });
});
