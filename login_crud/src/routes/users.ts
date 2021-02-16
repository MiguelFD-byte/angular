import {Router} from 'express'
import {usercontroller} from '../controller/usercontroller'
import { checkjwt } from '../middlewares/jwt';
import { userStatus } from '../middlewares/status';


const router = Router();

//todos los usuarios 
router.get('/',usercontroller.getAll);

//un usuario
router.get('/:id', usercontroller.getById);

//add usuario
router.post('/', usercontroller.addUser);

//add usuario
router.patch('/:id', usercontroller.editUser);


//add usuario
router.delete('/:id', usercontroller.deleteUser);

//buscar pendiente
router.get('/p/:id', usercontroller.getPendiente_user);

export default router;