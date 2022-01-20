import { Router } from 'express';
import changePasswordUser from '../controllers/user/changePasswordUser';
import createUser from '../controllers/user/createUser';
import deleteUser from '../controllers/user/deleteUser';
import editUser from '../controllers/user/editUser';
import loginUser from '../controllers/user/loginUser';

const userRoutes = Router();

userRoutes
    .post('/login', loginUser)
    .post('/signup', createUser)
    .patch('/', editUser)
    .delete('/', deleteUser)
    .patch('/password', changePasswordUser);

export default userRoutes;