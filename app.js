require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const { NODE_ENV } = process.env;
const { mongoUrl } = require('./utils/config');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errors-handler');
const usersRoutes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use(usersRoutes);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  if (NODE_ENV !== 'production') {
    console.log('Код запущен в режиме разработки');
  }
  console.log(`App listening on port ${PORT}`);
});
