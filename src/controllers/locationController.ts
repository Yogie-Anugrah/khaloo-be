import { RequestHandler } from "express";
import pool from "../db/db";


// Fetch all locations without any projection
export const getAllLocations:RequestHandler = async (req, res,next) => {
    try {
        const results = await pool.query("SELECT * FROM location_tbl");
        res.send(results.rows);
    } catch (err) {
        next(err);
    }

};

// Get all locations with projection needed on find-us-page ordered by store_name and only if status = true (active)
export const getLocation: RequestHandler = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT store_name, store_address, store_image, store_maps_url FROM location_tbl WHERE store_status=true ORDER BY store_name");

        res.send(result.rows);
    } catch (err) {
        next(err);
    }
};
