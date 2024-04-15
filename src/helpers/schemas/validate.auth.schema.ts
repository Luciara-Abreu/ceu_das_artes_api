import { body, header, check } from 'express-validator';

export const loginAuthSchema = [
  body('password').notEmpty().withMessage('Informe a sua senha.'),
  body('password').isLength({ min: 6 }).withMessage('Senha com menos de 6 caracteres.'),
  body('email').isEmail().isString().withMessage('E-mail não é válido.'),
];

export const forgetAuthSchema = [body('email').isEmail().isString().withMessage('E-mail não é válido.')];

export const resetAuthSchema = [
  body('password').notEmpty().withMessage('Informe a sua senha.'),
  body('password').isLength({ min: 6 }).withMessage('Senha com menos de 6 caracteres.'),
  // check('token').isJWT().withMessage('Token JWT inválido'), TODO: Check a way to validate the token
];

export const profileAuthSchema = [header('token').isJWT().withMessage('Token não é valido')];
