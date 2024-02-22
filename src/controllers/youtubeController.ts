import { RequestHandler } from "express";
import pool from "../db/db";

// Get all Youtube videos
export const getAllYoutubeVideos: RequestHandler = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM YoutubeVideo");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get top 5 Youtube Videos
export const getTopYoutubeVideos: RequestHandler = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM YoutubeVideo WHERE isActive = true LIMIT 5");
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a specific Youtube video by videoID
export const getYoutubeVideoById: RequestHandler = async (req, res) => {
    const { videoID } = req.params;
    try {
        const { rows } = await pool.query("SELECT * FROM YoutubeVideo WHERE videoID = $1", [videoID]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Youtube video not found" });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create a new Youtube video
export const createYoutubeVideo: RequestHandler = async (req, res) => {
    const { youtubeLink, title, description, thumbnailUrl, isActive } = req.body;
    try {
        const { rows } = await pool.query(
            "INSERT INTO YoutubeVideo (youtubeLink, title, description, thumbnailUrl, isActive) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [youtubeLink, title, description, thumbnailUrl, isActive]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update an existing Youtube video
export const updateYoutubeVideo: RequestHandler = async (req, res) => {
    const { videoID } = req.params;
    const { youtubeLink, title, description, thumbnailUrl, isActive } = req.body;
    try {
        const { rows } = await pool.query(
            "UPDATE YoutubeVideo SET youtubeLink = $1, title = $2, description = $3, thumbnailUrl = $4, isActive = $5 WHERE videoID = $6 RETURNING *",
            [youtubeLink, title, description, thumbnailUrl, isActive, videoID]
        );
        if (rows.length === 0) {
            res.status(404).json({ error: "Youtube video not found" });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a Youtube video
export const deleteYoutubeVideo: RequestHandler = async (req, res) => {
    const { videoID } = req.params;
    try {
        const { rows } = await pool.query("DELETE FROM YoutubeVideo WHERE videoID = $1 RETURNING *", [videoID]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Youtube video not found" });
        } else {
            res.json({ message: "Youtube video deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
