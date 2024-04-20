import { userListMock } from './user.list.mock';

export const UserServiceMock = {
  list: jest.fn().mockResolvedValue(userListMock),
  create: jest.fn().mockResolvedValue(userListMock[0]),
  show: jest.fn().mockResolvedValue(userListMock[0]),
  update: jest.fn().mockResolvedValue(userListMock[0]),
  delete: jest.fn().mockResolvedValue(true),
};
