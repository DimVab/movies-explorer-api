const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMyInfo, updateProfile } = require('../controllers/users');

userRoutes.get('/me', getMyInfo);
userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = userRoutes;
