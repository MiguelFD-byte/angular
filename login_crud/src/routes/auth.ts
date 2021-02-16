import {Router} from 'express'
import authcontroller from '../controller/authcontroller';
import { userStatus } from '../middlewares/status';


const router = Router();

//login
router.post('/login',authcontroller.login);

export default router;