const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const { JWT_SECRET } = require('../utils/config');

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
        JWT_SECRET,
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

module.exports.getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.status(200).send({ name: user.name, email: user.email, id: user._id });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный _id пользователя'));
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      res.status(200).send({ name: user.name, email: user.email });
    })
    .catch(next);
};
