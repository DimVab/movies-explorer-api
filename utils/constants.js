const badRequestErrorMessage = 'Переданы некорректные данные';
const userBadRequestErrorMessage = 'Переданы невалидные данные при создании пользователя';
const userNotFoundErrorMessage = 'Пользователь по указанному _id не найден';
const movieNotFoundErrorMessage = 'Фильм по указанному _id не найден';
const movieIdBadRequestErrorMessage = 'Передан невалидный _id фильма';
const forbiddenErrorMessage = 'Вам запрещено удалять чужие фильмы';
const emailConflictErrorMessage = 'Такой email уже существует';
const unauthorizedErrorMessage = 'Необходима авторизация';
const badAuthorizationErrorMessage = 'Неправильные почта или пароль';
const notFoundErrorMessage = 'Маршрут не найден';
const rateLimitErrorMessage = 'Превышен лимит запросов, пожалуйста, подождите немного';

const authorizationSuccessMessage = 'Авторизация прошла успешно';
const logoutSuccessMessage = 'Вы вышли из аккаунта';
const deleteMovieSuccessMessage = 'Фильм удалён';

module.exports = {
  badRequestErrorMessage,
  userBadRequestErrorMessage,
  userNotFoundErrorMessage,
  movieNotFoundErrorMessage,
  movieIdBadRequestErrorMessage,
  forbiddenErrorMessage,
  emailConflictErrorMessage,
  unauthorizedErrorMessage,
  badAuthorizationErrorMessage,
  notFoundErrorMessage,
  authorizationSuccessMessage,
  logoutSuccessMessage,
  deleteMovieSuccessMessage,
  rateLimitErrorMessage,
};
