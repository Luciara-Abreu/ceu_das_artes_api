import { Request, Response } from "express";
import { userListMock } from "./user.list.mock";

export const createUserResReqMock = () => {
  const req = { body: userListMock[0] } as Request;
  const res = { send: jest.fn(), status: jest.fn().mockReturnThis() } as unknown as Response;

  return { req, res }
}
