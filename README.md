# Дипломный проект "Movies-Explorer", backend-часть

## Обзор
Данный проект представляет собой backend-часть дипломного проекта Movies-Explorer - сервиса, в котором можно найти фильмы по запросу и сохранить их в личном кабинете

Реализованы следующие маршруты и методы бэкэнда:
* /signup POST - регистрация пользователя
* /signin POST - аутентификация пользователя
* промежуточная авторизация при запросах на нижеперечисленные адреса
* /signout POST - выход пользователя из личного кабинета
* /users/me GET - получение информации о пользователе
* /users/me PATCH - редактирование профиля пользователя
* /movies POST - сохранение фильма
* /movies GET - получение списка сохранённых пользователем фильмов
* /movies/:movieId DELETE - удаление карточки по её _id

Также настроены:
* валидация приходящих данных до их обработки в контроллерах с помощью модуля celebrate
* CORS
* централизованная обработка ошибок
* логирование
* ограничитель запросов за определённое время

## Используемые технологии

* JavaScript
* Node.js;
* Express.js;
* MongoDB;
* Mongoose;
* nodemon - для запуска в режиме разработки;
* модуль validator - для валидации email;
* модуль bcryptjs - для хеширования пароля;
* модуль jsonwebtoken - для создания и верификации токена;
* библиотека celebrate - для валидации приходящих запросов;
* cookies - для хранения токена на стороне клиента;
* регулярные выражения;
* модули winston, express-winston - для логирования;
* модуль dotenv - для подключения .env-файла;
* модуль express-rate-limit - для ограничения колечества запросов за определённое время;

Также на удалённом сервере используются:
* Nginx;
* cerbot - для подключения сертификата безопасности https;
* pm2 - для автоматического запуска сервера;

## Запуск проекта

`npm start` - запускает сервер
`npm run dev` — запускает сервер с hot-reload

**Ссылки на приложение:**  
http://51.250.0.189  
http://api.movies-explorer.vab.nomoredomains.work
