const rateLimit = require('express-rate-limit');
const { rateLimitErrorMessage } = require('../utils/constants');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: rateLimitErrorMessage },
});
