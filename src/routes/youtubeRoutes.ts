import express from "express";
import * as youtubeController from "../controllers/youtubeController";

const router = express.Router();

router.get("/videos", youtubeController.getAllYoutubeVideos);
router.post("/videos", youtubeController.createYoutubeVideo);
router.get("/videos/top", youtubeController.getTopYoutubeVideos);
router.get("/videos/:id", youtubeController.getYoutubeVideoById);


export default router;
