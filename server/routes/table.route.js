import { Router } from "express";
import {
  createTable,
  getAllTables,
  getTableByUserId,
  editTableById,
  deleteTabelByUserId,
} from "../controllers/table.controller.js";


const router = Router();

router.post("/create-table", createTable);

router.get("/get-all-tables", getAllTables);

router.get("/get-table-by-user-id/:userId", getTableByUserId);

router.put("/edit-table-by-id/:id", editTableById);

router.delete("/delete-table-by-id/:id", deleteTabelByUserId);



export default router;
