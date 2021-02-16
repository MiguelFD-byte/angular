import {Router} from 'express'

import auth from './auth'
import pendientes from './pendientes'
import users from './users'

const routes = Router();

routes.use('/users', users);
routes.use('/auth', auth);
routes.use('/pendientes', pendientes);


export default routes;