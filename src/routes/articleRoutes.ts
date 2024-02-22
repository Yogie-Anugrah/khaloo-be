import express from "express";
import * as articleController from "../controllers/articlesController";

const router = express.Router();

router.get("/list", articleController.getAllArticles);
router.get("/top", articleController.getTopArticles);
router.get("/:id", articleController.getArticleById);
router.post("/", articleController.createArticle);
router.put("/:id", articleController.updateArticleById);

export default router;