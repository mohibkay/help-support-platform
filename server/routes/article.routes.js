import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} from "../controllers/article.controller.js";

const router = Router();

router.route("/").get(getArticles);
router.route("/").post(createArticle);
router.route("/:id").put(updateArticle);
router.route("/:id").delete(deleteArticle);
export default router;
