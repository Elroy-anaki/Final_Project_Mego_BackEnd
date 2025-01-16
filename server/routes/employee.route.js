import { Router } from "express";
import {
  addEmployee,
  signIn,
  getAllEmployees,
  getEmployeeById,
  autoComplete,
  editEmployeeById,
  deleteEmployeeById
} from "../controllers/employee.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

isAdmin


const router = Router();

router.post("/add-employee",isAdmin, addEmployee);

router.post("/sign-in", signIn);

router.get("/get-all-employees", getAllEmployees);

router.get("/get-employee-by-id/:id", getEmployeeById);

router.get('/auto-complete', autoComplete)

router.put("/edit-employee-by-id/:id", editEmployeeById)

router.delete('/delete-employee-by-id/:id', isAdmin, deleteEmployeeById);

export default router;

