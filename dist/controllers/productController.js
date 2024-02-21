"use strict";
// productController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductMetadataById = exports.getProductIds = exports.getProductImagesById = exports.getProductById = exports.getProductList = void 0;
const db_1 = __importDefault(require("../db/db"));
// Fetch all products with projection needed on products page
const getProductList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield db_1.default.connect();
        const results = yield client.query("SELECT prod_id, prod_name, prod_exist, prod_main_img, prod_price, prod_flag FROM prod_tbl");
        client.release();
        res.json(results.rows);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductList = getProductList;
// Get product by ID with detailed information needed on detail product page
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const client = yield db_1.default.connect();
        const results = yield client.query("SELECT prod_id, prod_price, prod_name, prod_main_img, prod_desc, prod_ingredients, prod_how_to_use, prod_review FROM prod_tbl WHERE prod_id = $1", [id]);
        client.release();
        res.json(results.rows[0]);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductById = getProductById;
// Get product images by ID needed as carousel on detail product page
const getProductImagesById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const client = yield db_1.default.connect();
        const results = yield client.query("SELECT * FROM product_pict_id WHERE prod_id = $1", [id]);
        client.release();
        res.json(results.rows);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductImagesById = getProductImagesById;
// Get all product IDs to generateStaticParams SSG product detail page
const getProductIds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield db_1.default.connect();
        const results = yield client.query("SELECT prod_id FROM prod_tbl");
        client.release();
        res.json(results.rows);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductIds = getProductIds;
// Get product metadata by ID to generate dyncamic head title detail page product
const getProductMetadataById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const client = yield db_1.default.connect();
        const results = yield client.query("SELECT prod_name FROM prod_tbl WHERE prod_id = $1", [id]);
        client.release();
        res.json(results.rows[0]);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductMetadataById = getProductMetadataById;
