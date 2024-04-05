import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} from "../controllers/article.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkUserType } from "../middlewares/permission.middleware.js";
import { USER_ROLES } from "../config.js";

const router = Router();

router
  .route("/")
  .get(
    [verifyToken, checkUserType([USER_ROLES.SUPPORT, USER_ROLES.ADVERTISER])],
    getArticles
  )
  .post([verifyToken, checkUserType([USER_ROLES.SUPPORT])], createArticle);

router
  .route("/:id")
  .put([verifyToken, checkUserType([USER_ROLES.SUPPORT])], updateArticle)
  .delete([verifyToken, checkUserType([USER_ROLES.SUPPORT])], deleteArticle);

export default router;
