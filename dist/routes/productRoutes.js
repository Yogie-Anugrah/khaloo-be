"use strict";
// productRouter.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController = __importStar(require("../controllers/productController"));
const router = express_1.default.Router();
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
router.get("/search", productController.getProductsGlobalSearch);
exports.default = router;
