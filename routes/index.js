const router = require('express').Router();

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateRegistration, validateLogin } = require('../middlewares/validations');
const NotFoundError = require('../errors/not-found-error');
const { notFoundErrorMessage } = require('../utils/constants');

router.post('/signup', validateRegistration, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.post('/signout', logout);

router.use((req, res, next) => {
  next(new NotFoundError(notFoundErrorMessage));
});

module.exports = router;
