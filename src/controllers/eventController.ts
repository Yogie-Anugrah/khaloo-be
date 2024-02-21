import { RequestHandler } from "express";
import pool from "../db/db";

// Fetch all events without any projection
export const getAllEvents:RequestHandler = async (req, res, next) => {
    try {
        const client = await pool.connect();
        const results = await client.query("SELECT * FROM event_tbl");
        res.send(results.rows);
        client.release();
    } catch (err) {
        next(err);
    }
};

// Get all events with projection needed on find-us-page ordered by start_date and only if status = upcoming
export const getEvents: RequestHandler = async (req, res, next) => {
    try {
        const client = await pool.connect();
        const results = await client.query(`
            SELECT 
                event_name, 
                event_start_date, 
                event_end_date, 
                event_time, 
                event_location, 
                event_banner, 
                event_image 
            FROM 
                event_tbl 
            WHERE 
                event_status='Upcoming' 
            ORDER BY 
                event_start_date
        `);

        if (results.rows.length==0) {
            res.send([]);
        }
        else{
            const resultFormatting = results.rows.map((item) => ({
                type:"event",
                name: item.event_name,
                startDate: item.event_start_date,
                endDate: item.event_end_date,
                time: item.event_time,
                address: item.event_location,
                bannerUrl: item.event_banner,
                imageUrl: item.event_image
            }));
            res.send(resultFormatting);
        }
        
        client.release();
    } catch (err) {
        next(err);
    }
};