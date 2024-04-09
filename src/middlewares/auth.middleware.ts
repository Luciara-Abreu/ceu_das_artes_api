import { NextFunction, Request, Response } from 'express';
import { AuthRepository } from '../repository/auth.repository';
import * as jwt from 'jsonwebtoken';

type JwtPayload = {
  id: string;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const authRepository = new AuthRepository();

  try {
    if (!authorization) return res.status(401).json({ error: 'Não autorizado. Token ausente.' });

    const token = authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const user = await authRepository.getById(decodedToken.id);

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
