import { Router } from "express";
import {
  createTicket,
  deleteTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticket.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkUserType } from "../middlewares/permission.middleware.js";
import { USER_ROLES } from "../config.js";

const router = Router();

router
  .route("/")
  .get(
    [verifyToken, checkUserType([USER_ROLES.ADVERTISER, USER_ROLES.SUPPORT])],
    getTickets
  )
  .post([verifyToken, checkUserType([USER_ROLES.ADVERTISER])], createTicket);

router
  .route("/:id")
  .put(
    [verifyToken, checkUserType([USER_ROLES.ADVERTISER, USER_ROLES.SUPPORT])],
    updateTicket
  )
  .delete([verifyToken, checkUserType([USER_ROLES.ADVERTISER])], deleteTicket);

export default router;
