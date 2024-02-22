import express from "express";
import * as partnershipController from "../controllers/partnershipController";

const router = express.Router();

router.get("/partnerships", partnershipController.getAllPartnerships);
router.get("/partnerships/:id", partnershipController.getPartnershipById);
router.post("/partnerships", partnershipController.createPartnership);

export default router;
