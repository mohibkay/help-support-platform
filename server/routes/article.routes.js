import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} from "../controllers/article.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkUserType } from "../middlewares/permission.middleware.js";

const router = Router();

router
  .route("/")
  .get([verifyToken, checkUserType(["Support", "Advertiser"])], getArticles)
  .post([verifyToken, checkUserType(["Support"])], createArticle);

router
  .route("/:id")
  .put([verifyToken, checkUserType(["Support"])], updateArticle)
  .delete([verifyToken, checkUserType(["Support"])], deleteArticle);

export default router;
