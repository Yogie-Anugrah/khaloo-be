import express from "express";
import * as eventController from "../controllers/eventController";

const router = express.Router();

router.get("/events", eventController.getAllEvents);


export default router;
