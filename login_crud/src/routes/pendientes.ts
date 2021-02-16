import { Router } from 'express';
import pendientecontroller from '../controller/pendientecontroller';
import { checkjwt } from '../middlewares/jwt';


const router = Router();

//todos los pendientes
router.get('/', pendientecontroller.getAll);

//un pendiente
router.get('/:id', pendientecontroller.getById);

//agregar pendiente
router.post('/', pendientecontroller.add);

//editar pendiente
router.patch('/:id', pendientecontroller.edit);

//eliminar pendiente
router.delete('/:id', pendientecontroller.delete);

export default router;