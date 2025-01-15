import { Router } from "express";
import {
  createTable,
  getAllTables,
  getTableByUserEmail,
  editTableById,
  addGuests,
  deleteTabelById,
} from "../controllers/table.controller.js";

const router = Router();


router.post('/create-table', createTable);

router.get('/get-all-tables', getAllTables);

router.get('/get-table-by-user-id/:userEmail', getTableByUserEmail);

router.put('/edit-table-by-id/:id', editTableById);

router.put('/add-guests/:id', addGuests)

router.delete('/delete-table-by-id/:id', deleteTabelById);


export default router;


