// productRouter.ts

import express from "express";
import * as productController from "../controllers/productController";

const router = express.Router();

router.get("/product-list", productController.getProductList);
router.get("/product/:id", productController.getProductById);
router.get("/product/:id/images", productController.getProductImagesById);
router.get("/ids", productController.getProductsId);
router.get("/product-metadata/:id", productController.getProductMetadataById);

export default router;
