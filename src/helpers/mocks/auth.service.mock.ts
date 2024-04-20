import { userListMock } from './user.list.mock';

export const AuthServiceMock = {
  login: jest.fn().mockResolvedValue(userListMock[0]),
  forget: jest.fn(),
  reset: jest.fn().mockResolvedValue(userListMock[0]),
};
