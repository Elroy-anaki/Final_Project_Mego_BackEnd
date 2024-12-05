import { Router } from 'express';
import { addEmployee , getAllEmployees ,getEmployeeById} from '../controllers/employee.controller.js';

const router = Router();


router.post('/add-employee', addEmployee);

router.get('/get-all-employees', getAllEmployees);

router.get('/get-employee-by-id/:id', getEmployeeById);


export default router;