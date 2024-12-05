import { Router } from "express";
import {
  addEmployee,
  signIn,
  getAllEmployees,
  getEmployeeById,
  employeeIsTokenExist,
} from "../controllers/employee.controller.js";
import verifyToken from '../middlewares/verifyToken.middleware.js';
import { auth } from '../controllers/auth.controller.js'


const router = Router();

router.post("/add-employee", addEmployee);

router.post("/sign-in", signIn);

router.get("/get-all-employees", getAllEmployees);

router.get("/get-employee-by-id/:id", getEmployeeById);

router.get("/auth", auth);

export default router;
