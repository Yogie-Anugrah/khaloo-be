"use strict";
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
exports.updateBannerImpressionCount = exports.updateBannerClickCount = exports.deleteBanner = exports.updateBanner = exports.createBanner = exports.getBanners = void 0;
const db_1 = __importDefault(require("../db/db"));
// GET /banners
const getBanners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield db_1.default.query("SELECT * FROM banner_tbl");
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getBanners = getBanners;
// POST /banners
const createBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { campaign_name, start_date, end_date, banner_image_url, target_url } = req.body;
    try {
        const { rows } = yield db_1.default.query("INSERT INTO banner_tbl (campaign_name, start_date, end_date, banner_image_url, target_url) VALUES ($1, $2, $3, $4, $5) RETURNING *", [campaign_name, start_date, end_date, banner_image_url, target_url]);
        res.status(201).json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createBanner = createBanner;
// PUT /banners/:id
const updateBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { campaign_name, start_date, end_date, banner_image_url, target_url } = req.body;
    try {
        const { rows } = yield db_1.default.query("UPDATE banner_tbl SET campaign_name = $1, start_date = $2, end_date = $3, banner_image_url = $4, target_url = $5 WHERE id = $6 RETURNING *", [campaign_name, start_date, end_date, banner_image_url, target_url, id]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Banner not found" });
        }
        else {
            res.json(rows[0]);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateBanner = updateBanner;
// DELETE /banners/:id
const deleteBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield db_1.default.query("DELETE FROM banner_tbl WHERE id = $1 RETURNING *", [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Banner not found" });
        }
        else {
            res.json({ message: "Banner deleted successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteBanner = deleteBanner;
// Update banner click count
const updateBannerClickCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield db_1.default.query("UPDATE banner_tbl SET click_count = click_count + 1 WHERE id = $1 RETURNING *", [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Banner not found" });
        }
        else {
            res.json(rows[0]);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateBannerClickCount = updateBannerClickCount;
// Update banner impression count
const updateBannerImpressionCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield db_1.default.query("UPDATE banner_tbl SET impression_count = impression_count + 1 WHERE id = $1 RETURNING *", [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Banner not found" });
        }
        else {
            res.json(rows[0]);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateBannerImpressionCount = updateBannerImpressionCount;
