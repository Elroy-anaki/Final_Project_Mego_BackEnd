import { Router } from "express";
import {
  addOrder,
  getAllOrdersTables,
  getOrderByOrderId,
  editOrderById,
  changeStatus,
  deleteOrderById
} from "../controllers/order.controller.js";


const router = Router();

router.post("/add-order/:tableId", addOrder);

router.get("/get-all-orders-tables", getAllOrdersTables);

router.get("/get-order-by-order-id", getOrderByOrderId);

router.put("/edit-order-by-id/:id", editOrderById)

router.put("/change-status/:orderId", changeStatus)

router.delete('/delete-order-by-id/:id', deleteOrderById);

export default router;

