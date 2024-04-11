import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';

type JwtPayload = {
  id: string;
};

const repository = AppDataSource.getRepository(User);

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) return res.status(401).json({ error: 'Não autorizado. Token ausente.' });

    const token = authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const id = decodedToken.id;
    const user = await repository.findOneBy({ id });

    if (!user) return res.status(401).json({ error: 'Não autorizado. Usuário não encontrado.' });

    const { password: _, ...logedUser } = user;

    req.user = logedUser;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Não autorizado. Token inválido.' });
    } else {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};
