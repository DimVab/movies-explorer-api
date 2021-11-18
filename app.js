require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');

const { NODE_ENV, DB_ADRESS } = process.env;
const { mongodbDevAdress } = require('./utils/config');
const { createUser, login, logout } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(NODE_ENV !== 'production' ? mongodbDevAdress : DB_ADRESS, {
  useNewUrlParser: true,
});

app.use(express.json());

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

app.post('/signout', logout);
// потом убрать в защищённые роуты юзера

app.use(errors());

app.listen(PORT, () => {
  if (NODE_ENV !== 'production') {
    console.log('Код запущен в режиме разработки');
  }
  console.log(`App listening on port ${PORT}`);
});
