import express from "express";
import * as homeController from "../controllers/homeController";

const router = express.Router();

// fetch data home to use on home page
router.get("/banners", homeController.getBanners);
router.post("/banners", homeController.createBanner);
router.put("/banners/:id", homeController.updateBanner);
router.delete("/banners/:id", homeController.deleteBanner);

export default router;