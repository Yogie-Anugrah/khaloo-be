// productRouter.ts

import express from "express";
import * as productController from "../controllers/productController";

const router = express.Router();

// Fetch data product-list to use on product page
router.get("/list", productController.getProductList);

// Fetch highlight product
router.get("/highlight", productController.getHighlightProduct);

// Fetch data product information to use on product detail page
router.get("/:id", productController.getProductById);

// Fetch metadata information to use on product detail page as SSG
router.get("/:id/images", productController.getProductImagesById);

// Fetch product ids
router.get("/list/id", productController.getProductIds);

// Fetch product metadata by id
router.get("/metadata/:id", productController.getProductMetadataById);

export default router;
