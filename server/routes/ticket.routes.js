import { Router } from "express";
import {
  createTicket,
  deleteTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticket.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkUserType } from "../middlewares/permission.middleware.js";

const router = Router();

router
  .route("/")
  .get([verifyToken, checkUserType(["Advertiser", "Support"])], getTickets)
  .post([verifyToken, checkUserType(["Advertiser"])], createTicket);

router
  .route("/:id")
  .put([verifyToken, checkUserType(["Advertiser", "Support"])], updateTicket)
  .delete([verifyToken, checkUserType(["Advertiser"])], deleteTicket);

export default router;
