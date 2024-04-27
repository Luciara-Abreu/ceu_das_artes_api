import { NotFoundError, ConflictError } from '../helpers/api.error';
import { IUserDTO } from '../dto/user.dto';
import { UserService } from './user.service';
import { userListMock } from '../helpers/mocks/user.list.mock';
import bcrypt from 'bcrypt';
import { repositoryMock } from '../helpers/mocks/repository.mock';

jest.mock('../data-source', () => ({
  AppDataSource: {
    getRepository: () => repositoryMock,
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('password'),
  genSalt: jest.fn().mockResolvedValue('salt'),
}));

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('must be able to return a list of users', async () => {
      const userList = userListMock;

      repositoryMock.find.mockResolvedValueOnce(userList);

      const result = await userService.list();

      expect(result).toEqual(userList);
    });

    it('must be able to throw NotFoundError when the list is empty', async () => {
      repositoryMock.find.mockResolvedValueOnce([]);

      await expect(userService.list()).rejects.toThrow(NotFoundError);
    });
  });

  describe('show', () => {
    it('must be able to return the user with the given ID', async () => {
      const userId = '68bb53b9-b471-4bc8-8ab8-70fbff079eed';
      const user = userListMock[0];

      repositoryMock.findOneBy.mockResolvedValueOnce(user);

      const result = await userService.show(userId);

      expect(result).toEqual(user);
    });

    it('must be able to throw NotFoundError when the user is not found', async () => {
      repositoryMock.findOneBy.mockResolvedValueOnce(undefined);

      await expect(userService.show('non-existent-id')).rejects.toThrow(NotFoundError);
    });
  });

  describe('create', () => {
    it('must be able to create a new user', async () => {
      const userData: IUserDTO = { name: 'New User', email: 'newuser@example.com', password: 'password', phone: '23252429' };

      repositoryMock.exists.mockResolvedValueOnce(false);
      repositoryMock.save.mockResolvedValueOnce({ id: '68bb53b9-b471-4bc8-8ab8-70fbff079eed', ...userData });

      const result = await userService.create(userData);

      expect(result).toEqual({ id: '68bb53b9-b471-4bc8-8ab8-70fbff079eed', ...userData });
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 'salt');
    });

    it('must be able to throw ConflictError when user with the same email already exists', async () => {
      repositoryMock.exists.mockResolvedValueOnce(true);
      await expect(userService.create(userListMock[0])).rejects.toThrow(ConflictError);
    });
  });

  describe('update', () => {
    it('must be able to update the user with the given ID', async () => {
      const userId = '68bb53b9-b471-4bc8-8ab8-70fbff079eed';
      const updatedUserData: Partial<IUserDTO> = { name: 'Updated User' };
      const existingUser = { id: userId, name: 'Original User' };

      repositoryMock.findOneBy.mockResolvedValueOnce(existingUser);
      repositoryMock.update.mockResolvedValueOnce({ id: userId, ...existingUser, ...updatedUserData });

      const result = await userService.update(userId, updatedUserData);

      expect(result).toEqual({ id: userId, ...existingUser, ...updatedUserData });
    });

    it('must be able to throw NotFoundError when the user to update is not found', async () => {
      repositoryMock.findOneBy.mockResolvedValueOnce(undefined);

      await expect(userService.update('non-existent-id', { name: 'Updated User' })).rejects.toThrow(NotFoundError);
    });
  });

  describe('delete', () => {
    it('must be able to delete the user with the given ID', async () => {
      const userId = '68bb53b9-b471-4bc8-8ab8-70fbff079eed';
      const existingUser = { id: userId, name: 'User to Delete' };

      repositoryMock.findOneBy.mockResolvedValueOnce(existingUser);

      await userService.delete(userId);

      expect(repositoryMock.delete).toHaveBeenCalledWith({ id: userId });
    });

    it('must be able to throw NotFoundError when the user to delete is not found', async () => {
      repositoryMock.findOneBy.mockResolvedValueOnce(undefined);

      await expect(userService.delete('non-existent-id')).rejects.toThrow(NotFoundError);
    });
  });
});
