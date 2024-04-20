import { Request, Response } from 'express';
import { userListMock } from './user.list.mock';

export const deleteUserResReqMock = () => {
  const req = { params: { id: userListMock[0].id } } as unknown as Request;
  const res = { send: jest.fn(), status: jest.fn().mockReturnThis() } as unknown as Response;

  return { req, res };
};
