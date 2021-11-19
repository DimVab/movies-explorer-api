const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMyInfo, logout, updateProfile } = require('../controllers/users');
const { saveMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { urlPatternForJoi } = require('../utils/url-patterns');

routes.post('/signout', logout);
routes.get('/users/me', getMyInfo);

routes.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

routes.get('/movies', getMovies);

routes.post('/movies', celebrate({
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
}), saveMovie);

routes.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = routes;
