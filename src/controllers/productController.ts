// productController.ts

import { RequestHandler } from "express";
import pool from "../db/db";

export const getProductList:RequestHandler = async (req, res, next) => {
    try {
        const results = await pool.query("SELECT prod_id, prod_name, prod_exist, prod_main_img, prod_price, prod_flag FROM prod_tbl");
        res.send(results.rows);
    } catch (err) {
        next(err);
    }
};

export const getProductById:RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await pool.query("SELECT prod_id, prod_price, prod_name, prod_main_img, prod_desc, prod_ingredients, prod_how_to_use, prod_review FROM prod_tbl WHERE prod_id = $1", [id]);
        res.send(results.rows[0]);
    } catch (err) {
        next(err);
    }
};

export const getProductImagesById:RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await pool.query("SELECT * FROM product_pict_id WHERE prod_id = $1", [id]);
        res.send(results.rows);
    } catch (err) {
        next(err);
    }
};

export const getProductsId:RequestHandler = async (req, res, next) => {
    try {
        const results = await pool.query("SELECT prod_id FROM prod_tbl");
        res.send(results.rows);
    } catch (err) {
        next(err);
    }
};

export const getProductMetadataById:RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await pool.query("SELECT prod_name FROM prod_tbl WHERE prod_id = $1", [id]);
        res.send(results.rows[0]);
    } catch (err) {
        next(err);
    }
};
