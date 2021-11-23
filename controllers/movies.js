const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  badRequestErrorMessage,
  movieNotFoundErrorMessage,
  deleteMovieSuccessMessage,
  forbiddenErrorMessage,
  movieIdBadRequestErrorMessage,
} = require('../utils/constants');

module.exports.saveMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err);
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((userMovies) => res.status(200).send(userMovies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(movieNotFoundErrorMessage);
    })
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        return movie.remove()
          .then(() => {
            res.status(200).send({ message: deleteMovieSuccessMessage });
          });
      }
      throw new ForbiddenError(forbiddenErrorMessage);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(movieIdBadRequestErrorMessage));
      } else {
        next(err);
      }
    });
};
