import { RequestHandler } from "express";
import pool from "../db/db";

// Fetch all locations without any projection
export const getAllLocations: RequestHandler = async (req, res, next) => {
    try {
        const client = await pool.connect();
        const results = await client.query("SELECT * FROM location_tbl");
        res.send(results.rows);
        client.release();
    } catch (err) {
        next(err);
    }
};

// Get all locations with projection needed on find-us-page ordered by store_name and only if status = true (active)
export const getLocation: RequestHandler = async (req, res, next) => {
    try {
        const client = await pool.connect();

        // Validasi: Pastikan status toko adalah true
        const query = `
            SELECT 
                store_name, 
                store_address, 
                store_image, 
                store_maps_url 
            FROM 
                location_tbl 
            WHERE 
                store_status = true 
            ORDER BY 
                store_name
        `;

        const result = await client.query(query);

        if (result.rows.length === 0) {
            res.send([]);
        } else {
            const resultFormatting = result.rows.map((item) => ({
                type: "location",
                name: item.store_name,
                address: item.store_address,
                imageUrl: item.store_image,
                mapsUrl: item.store_maps_url,
            }));

            res.send(resultFormatting);
        }
        client.release();
    } catch (err) {
        next(err);
    }
};

export const getLocationsGlobalSearch: RequestHandler = async (
    req,
    res,
    next
) => {
    try {
        const { query } = req.query;

        const client = await pool.connect();
        const results = await client.query(
            `
      SELECT 
        store_name, 
        store_address, 
        store_image
      FROM 
        location_tbl 
      WHERE 
        store_name ILIKE $1
        OR store_address ILIKE $1
        AND store_status = true
      ORDER BY 
        store_name
    `,
            [`%${query}%`]
        );

        const resultFormatting = results.rows.map((item) => ({
            title: item.store_name,
            desc: item.store_address,
            imageUrl: item.store_image,
        }));

        res.send(resultFormatting);
        client.release();
    } catch (err) {
        next(err);
    }
};
