// productRouter.ts

import express from "express";
import * as productController from "../controllers/productController";

const router = express.Router();

// Fetch data product-list to use on product page
router.get("/list", productController.getProductList);

// Fetch data product information to use on product detail page
router.get("/:id", productController.getProductById);

// Fetch metadata information to use on product detail page as SSG
router.get("/:id/images", productController.getProductImagesById);

router.get("/list/id", productController.getProductIds);

router.get("/metadata/:id", productController.getProductMetadataById);

export default router;
