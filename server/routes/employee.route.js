import { Router } from "express";
import {
  addEmployee,
  signIn,
  getAllEmployees,
  getEmployeeById,
  editEmployeeById,
  deleteEmployeeById
} from "../controllers/employee.controller.js";


const router = Router();

router.post("/add-employee", addEmployee);

router.post("/sign-in", signIn);

router.get("/get-all-employees", getAllEmployees);

router.get("/get-employee-by-id/:id", getEmployeeById);

router.put("/edit-employee-by-id/:id", editEmployeeById)

router.delete('/delete-employee-by-id/:id', deleteEmployeeById);

export default router;

