import { Router } from "express";
import {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  employeeIsTokenExist,
} from "../controllers/employee.controller.js";

const router = Router();

router.post("/add-employee", addEmployee);

router.get("/get-all-employees", getAllEmployees);

router.get("/get-employee-by-id/:id", getEmployeeById);

router.get("/employee-is-token-exist", employeeIsTokenExist);

export default router;
