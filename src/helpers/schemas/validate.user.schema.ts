import { body, param } from 'express-validator';

export const createUserSchema = [
  body('name').isString().notEmpty().withMessage('Informe o seu nome.'),
  body('email').isEmail().isString().withMessage('E-mail não é válido.'),
  body('fone').isLength({ max: 15 }).withMessage('Quantidade de caracteres inválida'),
  body('password').notEmpty().withMessage('Informe a sua senha.'),
  body('password').isLength({ min: 6 }).withMessage('Senha com menos de 6 caracteres.'),
];

export const showUserSchema = [param('id').isUUID().withMessage('O id informado não é valido.')];

export const updateUserSchema = [
  param('id').isUUID().withMessage('O id informado não é valido.'),
  body('name').isString().notEmpty().withMessage('Informe o seu nome.'),
  body('email').isEmail().isString().withMessage('E-mail não é válido.'),
];

export const deleteUserSchema = [param('id').isUUID().withMessage('O id informado não é valido.')];
