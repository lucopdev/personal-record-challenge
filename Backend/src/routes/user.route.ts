import express from 'express';
import userController from '../controller/User.controller';

const route = express.Router();

route.get('/api/users', userController.getUser);
route.post('/api/file', userController.createUser);
route.delete('/api/file', userController.deleteUser);

export default route;
