import { Request, Response } from 'express';
import { userListMock } from './user.list.mock';

export const listUsersResReqMock = () => {
  const req = { body: userListMock } as Request;
  const res = { send: jest.fn(), status: jest.fn().mockReturnThis() } as unknown as Response;

  return { req, res };
};
