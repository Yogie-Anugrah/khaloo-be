import express from "express";
import * as locationController from "../controllers/locationController";

const router = express.Router();

router.get("/locations", locationController.getAllLocations);
// router.post("/add-dummy-locations", locationController.addDummyLocations);

export default router;
