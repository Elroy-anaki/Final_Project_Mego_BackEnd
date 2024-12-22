import { Router } from "express";
import {
  createTable,
  getAllTables,
  getTableByUserId,
  editTableByUserId,
  deleteTabelByUserId,
} from "../controllers/table.controller.js";


const router = Router();

router.post("/create-table", createTable);

router.get("/get-all", getAllTables);

router.get("/get-by-user-id/:id", getTableByUserId);

router.put("/edit-by-user-id/:id", editTableByUserId);

router.delete("/delete-by-user-id/:id", deleteTabelByUserId);



export default router;
