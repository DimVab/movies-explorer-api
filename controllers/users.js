const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const { JWT_SECRET } = require('../utils/config');
const {
  emailConflictErrorMessage,
  userBadRequestErrorMessage,
  authorizationSuccessMessage,
  logoutSuccessMessage,
  userNotFoundErrorMessage,
} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(200).send({
      name: user.name, email: user.email, _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError(emailConflictErrorMessage));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(userBadRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

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
      }).status(200).send({ message: authorizationSuccessMessage });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').status(200).send({ message: logoutSuccessMessage });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.checkToken = (req, res, next) => {
  try {
    res.status(200).send({ message: authorizationSuccessMessage });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(userNotFoundErrorMessage);
    })
    .then((user) => {
      res.status(200).send({ name: user.name, email: user.email, id: user._id });
    })
    .catch(next);
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
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError(emailConflictErrorMessage));
      } else {
        next(err);
      }
    });
};
