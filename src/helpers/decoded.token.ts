import jwt, { JwtPayload } from 'jsonwebtoken';

export const decodedToken = (authorization: string) => {
  const token = authorization.split(' ')[1];

  return jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
};
