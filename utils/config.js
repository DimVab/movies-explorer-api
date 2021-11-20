const { NODE_ENV, MONGO_URL } = process.env;
const mongoUrl = NODE_ENV !== 'production' ? 'mongodb://localhost:27017/bitfilmsdb' : MONGO_URL;
const jwtSecretDev = 'development';

module.exports = {
  mongoUrl,
  jwtSecretDev,
};
