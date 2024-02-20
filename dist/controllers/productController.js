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
exports.getProductMetadataById = exports.getProductsId = exports.getProductImagesById = exports.getProductById = exports.getProductList = void 0;
const db_1 = __importDefault(require("../db/db"));
const getProductList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query("SELECT prod_id, prod_name, prod_exist, prod_main_img, prod_price, prod_flag FROM prod_tbl");
        res.send(results.rows);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductList = getProductList;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const results = yield db_1.default.query("SELECT prod_id, prod_price, prod_name, prod_main_img, prod_desc, prod_ingredients, prod_how_to_use, prod_review FROM prod_tbl WHERE prod_id = $1", [id]);
        res.send(results.rows[0]);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductById = getProductById;
const getProductImagesById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const results = yield db_1.default.query("SELECT * FROM product_pict_id WHERE prod_id = $1", [id]);
        res.send(results.rows);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductImagesById = getProductImagesById;
const getProductsId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query("SELECT prod_id FROM prod_tbl");
        res.send(results.rows);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductsId = getProductsId;
const getProductMetadataById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const results = yield db_1.default.query("SELECT prod_name FROM prod_tbl WHERE prod_id = $1", [id]);
        res.send(results.rows[0]);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductMetadataById = getProductMetadataById;
