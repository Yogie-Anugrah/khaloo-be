import { RequestHandler } from "express";
import pool from "../db/db";

// Fetch all events without any projection
export const getAllEvents:RequestHandler = async (req, res, next) => {
    try {
        const results = await pool.query("SELECT * FROM event_tbl");
        res.send(results.rows);
    } catch (err) {
        next(err);
    }
};

// Get all events with projection needed on find-us-page ordered by start_date and only if status = upcoming
export const getEvents: RequestHandler = async (req, res, next) => {
    try {
        const results = await pool.query(
            "SELECT id, event_name, event_start_date, event_end_date, event_time, event_location, event_banner FROM event_tbl WHERE event_status='Upcoming' ORDER BY event_start_date"
        );
        res.send(results.rows);
    } catch (err) {
        next(err);
    }
};
