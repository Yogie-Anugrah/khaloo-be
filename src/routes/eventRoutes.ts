import express from "express";
import * as eventController from "../controllers/eventController";

const router = express.Router();

// Fetch data event to use on find-us page
router.get("/", eventController.getEvents);


export default router;
