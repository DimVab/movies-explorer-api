const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "Email" должно быть заполнено валидным email')
      .messages({
        'string.base': 'Поле "Email" должно быть строкой',
        'string.empty': 'Поле "Email" не должно быть пустым',
        'any.required': 'Поле "Email" обязательно для заполнения',
      }),
    password: Joi.string().required()
      .messages({
        'string.base': 'Поле "Пароль" должно быть строкой',
        'string.empty': 'Поле "Пароль" не должно быть пустым',
        'any.required': 'Поле "Пароль" обязательно для заполнения',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Поле "Имя" должно быть строкой',
        'string.empty': 'Поле "Имя" не должно быть пустым',
        'string.min': 'Поле "Имя" должно быть не короче 2 символов',
        'string.max': 'Поле "Имя" должно быть не длиннее 30 символов',
        'any.required': 'Поле "Имя" обязательно для заполнения',
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "Email" должно быть заполнено валидным email')
      .messages({
        'string.base': 'Поле "Email" должно быть строкой',
        'string.empty': 'Поле "Email" не должно быть пустым',
        'any.required': 'Поле "Email" обязательно для заполнения',
      }),
    password: Joi.string().required()
      .messages({
        'string.base': 'Поле "Пароль" должно быть строкой',
        'string.empty': 'Поле "Пароль" не должно быть пустым',
        'any.required': 'Поле "Пароль" обязательно для заполнения',
      }),
  }),
});

const validateProfileInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Поле "Имя" должно быть строкой',
        'string.empty': 'Поле "Имя" не должно быть пустым',
        'string.min': 'Поле "Имя" должно быть не короче 2 символов',
        'string.max': 'Поле "Имя" должно быть не длиннее 30 символов',
        'any.required': 'Поле "Имя" обязательно для заполнения',
      }),
    email: Joi.string().required().email()
      .message('Поле "Email" должно быть заполнено валидным email')
      .messages({
        'string.base': 'Поле "Email" должно быть строкой',
        'string.empty': 'Поле "Email" не должно быть пустым',
        'any.required': 'Поле "Email" обязательно для заполнения',
      }),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24)
      .message('Длина ID фильма должна составлять 24 символа'),
  }),
});

const validateMovieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.base': 'Поле "country" должно быть строкой',
        'string.empty': 'Поле "country" не должно быть пустым',
        'any.required': 'Поле "country" обязательно для заполнения',
      }),
    director: Joi.string().required()
      .messages({
        'string.base': 'Поле "director" должно быть строкой',
        'string.empty': 'Поле "director" не должно быть пустым',
        'any.required': 'Поле "director" обязательно для заполнения',
      }),
    duration: Joi.number().required()
      .messages({
        'number.base': 'Поле "duration" должно быть числом',
        'number.empty': 'Поле "duration" не должно быть пустым',
        'any.required': 'Поле "duration" обязательно для заполнения',
      }),
    year: Joi.string().required()
      .messages({
        'string.base': 'Поле "year" должно быть строкой',
        'string.empty': 'Поле "year" не должно быть пустым',
        'any.required': 'Поле "year" обязательно для заполнения',
      }),
    description: Joi.string().required()
      .messages({
        'string.base': 'Поле "description" должно быть строкой',
        'string.empty': 'Поле "description" не должно быть пустым',
        'any.required': 'Поле "description" обязательно для заполнения',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "image" должно быть заполнено валидным URL-адресом');
    })
      .messages({
        'string.base': 'Поле "image" должно быть строкой',
        'string.empty': 'Поле "image" не должно быть пустым',
        'any.required': 'Поле "image" обязательно для заполнения',
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "trailer" должно быть заполнено валидным URL-адресом');
    })
      .messages({
        'string.base': 'Поле "trailer" должно быть строкой',
        'string.empty': 'Поле "trailer" не должно быть пустым',
        'any.required': 'Поле "trailer" обязательно для заполнения',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "thumbnail" должно быть заполнено валидным URL-адресом');
    })
      .messages({
        'string.base': 'Поле "thumbnail" должно быть строкой',
        'string.empty': 'Поле "thumbnail" не должно быть пустым',
        'any.required': 'Поле "thumbnail" обязательно для заполнения',
      }),
    NameRU: Joi.string().required()
      .messages({
        'string.base': 'Поле "nameRU" должно быть строкой',
        'string.empty': 'Поле "nameRU" не должно быть пустым',
        'any.required': 'Поле "nameRU" обязательно для заполнения',
      }),
    NameEN: Joi.string().required()
      .messages({
        'string.base': 'Поле "nameEN" должно быть строкой',
        'string.empty': 'Поле "nameEN" не должно быть пустым',
        'any.required': 'Поле "nameEN" обязательно для заполнения',
      }),
    MovieId: Joi.string().required()
      .messages({
        'string.base': 'Поле "MovieId" должно быть строкой',
        'string.empty': 'Поле "MovieId" не должно быть пустым',
        'any.required': 'Поле "MovieId" обязательно для заполнения',
      }),
    owner: Joi.string().length(24).hex()
      .message('Длина ID пользователя должна составлять 24 символа'),
  }),
});

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfileInfo,
  validateMovieId,
  validateMovieInfo,
};
