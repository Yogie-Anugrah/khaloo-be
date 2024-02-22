import { RequestHandler } from "express";
import pool from "../db/db";

// GET /banners
export const getBanners: RequestHandler = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM banner_tbl");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST /banners
export const createBanner: RequestHandler = async (req, res) => {
    const { campaign_name, start_date, end_date, banner_image_url, target_url } = req.body;

    try {
        const { rows } = await pool.query(
            "INSERT INTO banner_tbl (campaign_name, start_date, end_date, banner_image_url, target_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [campaign_name, start_date, end_date, banner_image_url, target_url]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// PUT /banners/:id
export const updateBanner: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { campaign_name, start_date, end_date, banner_image_url, target_url } = req.body;

    try {
        const { rows } = await pool.query(
            "UPDATE banner_tbl SET campaign_name = $1, start_date = $2, end_date = $3, banner_image_url = $4, target_url = $5 WHERE id = $6 RETURNING *",
            [campaign_name, start_date, end_date, banner_image_url, target_url, id]
        );

        if (rows.length === 0) {
            res.status(404).json({ error: "Banner not found" });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE /banners/:id
export const deleteBanner: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query("DELETE FROM banner_tbl WHERE id = $1 RETURNING *", [id]);

        if (rows.length === 0) {
            res.status(404).json({ error: "Banner not found" });
        } else {
            res.json({ message: "Banner deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update banner click count
export const updateBannerClickCount: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query("UPDATE banner_tbl SET click_count = click_count + 1 WHERE id = $1 RETURNING *", [id]);

        if (rows.length === 0) {
            res.status(404).json({ error: "Banner not found" });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update banner impression count
export const updateBannerImpressionCount: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query("UPDATE banner_tbl SET impression_count = impression_count + 1 WHERE id = $1 RETURNING *", [id]);

        if (rows.length === 0) {
            res.status(404).json({ error: "Banner not found" });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};