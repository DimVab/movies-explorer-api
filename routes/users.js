const userRoutes = require('express').Router();

const { getMyInfo, updateProfile } = require('../controllers/users');
const { validateProfileInfo } = require('../middlewares/validations');

userRoutes.get('/me', getMyInfo);
userRoutes.patch('/me', validateProfileInfo, updateProfile);

module.exports = userRoutes;
