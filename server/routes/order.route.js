import { Router } from "express";
import {
  addOrder,
  getAllOrders,
  getOrderById,
  editOrderById,
  deleteOrderById
} from "../controllers/order.controller.js";


const router = Router();

router.post("/add-order", addOrder);

router.get("/get-all-orders", getAllOrders);

router.get("/get-order-by-id/:id", getOrderById);

router.put("/edit-order-by-id/:id", editOrderById)

router.delete('/delete-order-by-id/:id', deleteOrderById);

export default router;

