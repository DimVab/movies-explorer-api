const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new UnauthorizedError('Необходима авторизация'));
    }
    next(err);
  }

  req.user = payload;

  next();
};
