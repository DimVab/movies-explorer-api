const movieRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { saveMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { urlPatternForJoi } = require('../utils/url-patterns');

movieRoutes.get('/', getMovies);

movieRoutes.post('/', celebrate({
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

movieRoutes.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = movieRoutes;
