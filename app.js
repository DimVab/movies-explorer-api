require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { NODE_ENV } = process.env;
const { MONGO_URL } = require('./utils/config');
const errorsHandler = require('./middlewares/errors-handler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rate-limit');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  if (NODE_ENV !== 'production') {
    console.log('Код запущен в режиме разработки');
  }
  console.log(`App listening on port ${PORT}`);
});
