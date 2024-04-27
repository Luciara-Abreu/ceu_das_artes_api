import { tokenMock } from './token.mock';
import { userListMock } from './user.list.mock';

export const AuthServiceMock = {
  createToken: jest.fn().mockResolvedValue(tokenMock),
  login: jest.fn().mockResolvedValue(userListMock[0]),
  forget: jest.fn(),
  reset: jest.fn().mockResolvedValue(userListMock[0]),
};
