const movieRoutes = require('express').Router();

const { saveMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { validateMovieId, validateMovieInfo } = require('../middlewares/validations');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', validateMovieInfo, saveMovie);
movieRoutes.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = movieRoutes;
