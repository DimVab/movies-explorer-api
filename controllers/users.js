const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const { jwtSecretDev } = require('../utils/config');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(200).send({
      name: user.name, email: user.email, _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError('Такой email уже существует'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы невалидные данные при создании пользователя'));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    throw new BadRequestError('Ошибка валидации Email');
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : jwtSecretDev,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).status(200).send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').status(200).send({ message: 'Вы вышли из аккаунта' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
