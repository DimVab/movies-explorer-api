const userRoutes = require('express').Router();

const { getMyInfo, updateProfile, checkToken } = require('../controllers/users');
const { validateProfileInfo } = require('../middlewares/validations');

userRoutes.get('/me', getMyInfo);
userRoutes.patch('/me', validateProfileInfo, updateProfile);
userRoutes.post('/identify', checkToken);

module.exports = userRoutes;
