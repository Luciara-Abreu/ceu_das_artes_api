import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';
import { decodedToken } from '../helpers/decoded.token';

const repository = AppDataSource.getRepository(User);

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) return res.status(401).json({ error: 'Não autorizado. Token ausente.' });

    const id = decodedToken(authorization).id;
    const user = await repository.findOneBy({ id });

    if (!user) return res.status(401).json({ error: 'Não autorizado. Usuário não encontrado.' });

    const { password: _, ...logedUser } = user;

    req.user = logedUser;

    next();
  } catch (error) {
    error instanceof jwt.JsonWebTokenError
      ? res.status(401).json({ error: 'Não autorizado. Token inválido.' })
      : res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
