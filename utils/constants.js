const badRequestErrorMessage = 'Переданы некорректные данные';
const userBadRequestErrorMessage = 'Переданы невалидные данные при создании пользователя';
const emailBadRequestErrorMessage = 'Ошибка валидации Email';
const userNotFoundErrorMessage = 'Пользователь по указанному _id не найден';
const movieNotFoundErrorMessage = 'Фильм по указанному _id не найден';
const userIdBadRequestErrorMessage = 'Передан невалидный _id пользователя';
const movieIdBadRequestErrorMessage = 'Передан невалидный _id фильма';
const forbiddenErrorMessage = 'Вам запрещено удалять чужие фильмы';
const emailConflictErrorMessage = 'Такой email уже существует';
const unauthorizedErrorMessage = 'Необходима авторизация';
const badAuthorizationErrorMessage = 'Неправильные почта или пароль';
const notFoundErrorMessage = 'Маршрут не найден';

const authorizationSuccessMessage = 'Авторизация прошла успешно';
const logoutSuccessMessage = 'Вы вышли из аккаунта';
const deleteMovieSuccessMessage = 'Фильм удалён';

module.exports = {
  badRequestErrorMessage,
  userBadRequestErrorMessage,
  emailBadRequestErrorMessage,
  userNotFoundErrorMessage,
  movieNotFoundErrorMessage,
  userIdBadRequestErrorMessage,
  movieIdBadRequestErrorMessage,
  forbiddenErrorMessage,
  emailConflictErrorMessage,
  unauthorizedErrorMessage,
  badAuthorizationErrorMessage,
  notFoundErrorMessage,
  authorizationSuccessMessage,
  logoutSuccessMessage,
  deleteMovieSuccessMessage,
}