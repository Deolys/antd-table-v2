const { body } = require('express-validator');

const userCreateValidation = [
  body('name', 'Нужно ввести имя пользователя').trim().isLength({ min: 1 }).isString(),
  body('email', 'Неверный формат почты').trim().isLength({ min: 1 }).trim().isEmail(),
  body('password', 'Пароль обязателен').trim().isLength({ min: 1 }),
  body('type_id', 'Тип пользователя обязателен').isLength({ min: 1 }).isNumeric(),
];

module.exports = { userCreateValidation };
