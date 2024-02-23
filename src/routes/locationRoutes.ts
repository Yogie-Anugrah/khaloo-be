import express from "express";
import * as locationController from "../controllers/locationController";

const router = express.Router();

// Fetch data location to use on find-us page
router.get("/", locationController.getLocation);

// Fetch data location for global search
router.get("/search", locationController.getLocationsGlobalSearch);

export default router;
