const { celebrate, Joi } = require('celebrate');
const { urlPatternForJoi } = require('../utils/url-patterns');

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateProfileInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

const validateMovieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(urlPatternForJoi)),
    trailer: Joi.string().required().pattern(new RegExp(urlPatternForJoi)),
    thumbnail: Joi.string().required().pattern(new RegExp(urlPatternForJoi)),
    NameRU: Joi.string().required(),
    NameEN: Joi.string().required(),
    MovieId: Joi.string().required(),
    owner: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfileInfo,
  validateMovieId,
  validateMovieInfo,
};
