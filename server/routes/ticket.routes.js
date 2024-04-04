import { Router } from "express";
import {
  createTicket,
  deleteTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticket.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyToken, getTickets);
router.route("/").post(verifyToken, createTicket);
router.route("/:id").put(verifyToken, updateTicket);
router.route("/:id").delete(verifyToken, deleteTicket);

export default router;
