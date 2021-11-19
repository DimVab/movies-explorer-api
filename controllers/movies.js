const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.saveMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    NameRU,
    NameEN,
    thumbnail,
    MovieId,
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
    NameRU,
    NameEN,
    thumbnail,
    MovieId,
    owner,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find()
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм по указанному _id не найден');
    })
    .then((movie) => movie.owner.toString())
    .then((movieOwnerId) => {
      if (req.user._id === movieOwnerId) {
        Movie.findByIdAndDelete(req.params.movieId)
          .then(() => {
            res.status(200).send({ message: 'Фильм удалён' });
          });
      } else {
        throw new ForbiddenError('Вам запрещено удалять чужие фильмы');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный _id фильма'));
      }
      next(err);
    });
};
