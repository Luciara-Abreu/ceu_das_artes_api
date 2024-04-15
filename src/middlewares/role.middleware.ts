import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';
import jwt from 'jsonwebtoken';
import { decodedToken } from '../helpers/decoded.token';

const repository = AppDataSource.getRepository(User);

export const roleMiddleware = (allowedRole: number[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    try {
      const id = decodedToken(authorization).id;
      const user = await repository.findOneBy({ id });

      allowedRole.includes(user.role) ? next() : res.status(401).json({ error: 'Você não possui autorização' });
    } catch (error) {
      error instanceof jwt.JsonWebTokenError
        ? res.status(401).json({ error: 'Não autorizado. Token inválido.' })
        : res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  };
};
