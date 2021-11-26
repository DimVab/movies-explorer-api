const { NODE_ENV, MONGO_URL, JWT_SECRET } = process.env;

module.exports = {
  MONGO_URL: NODE_ENV !== 'production' ? 'mongodb://localhost:27017/moviesdb' : MONGO_URL,
  JWT_SECRET: NODE_ENV !== 'production' ? 'development' : JWT_SECRET,
};
