// productController.ts

import { RequestHandler } from "express";
import pool from "../db/db";

// Fetch all products with projection needed on products page
export const getProductList: RequestHandler = async (req, res, next) => {
    try {
        const client = await pool.connect();
        const results = await client.query("SELECT prod_id, prod_name, prod_exist, prod_main_img, prod_price, prod_flag FROM prod_tbl");
        client.release();
        res.send(results.rows);
    } catch (err) {
        next(err);
    }
};

// Get product by ID with detailed information needed on detail product page
export const getProductById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const client = await pool.connect();
        const results = await client.query("SELECT prod_id, prod_price, prod_name, prod_main_img, prod_desc, prod_ingredients, prod_how_to_use, prod_review FROM prod_tbl WHERE prod_id = $1", [id]);
        client.release();
        res.send(results.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Get product images by ID needed as carousel on detail product page
export const getProductImagesById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const client = await pool.connect();
        const results = await client.query("SELECT * FROM product_pict_id WHERE prod_id = $1", [id]);
        client.release();
        res.send(results.rows);
    } catch (err) {
        next(err);
    }
};

// Get all product IDs to generateStaticParams SSG product detail page
export const getProductIds: RequestHandler = async (req, res, next) => {
    try {
        const client = await pool.connect();
        const results = await client.query("SELECT prod_id FROM prod_tbl");
        client.release();
        res.send(results.rows);
    } catch (err) {
        next(err);
    }
};

// Get product metadata by ID to generate dyncamic head title detail page product
export const getProductMetadataById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const client = await pool.connect();
        const results = await client.query("SELECT prod_name FROM prod_tbl WHERE prod_id = $1", [id]);
        client.release();
        res.send(results.rows[0]);
    } catch (err) {
        next(err);
    }
};
