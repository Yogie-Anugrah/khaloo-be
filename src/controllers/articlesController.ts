import { RequestHandler } from "express";
import pool from "../db/db";

// Create a new article
export const createArticle: RequestHandler = async (req, res) => {
    try {
        const { title, content, author, main_image_url, related_articles } = req.body;
        const query = "INSERT INTO article_tbl (title, content, author, main_image_url, related_articles) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [title, content, author, main_image_url, related_articles];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all articles
export const getAllArticles: RequestHandler = async (req, res) => {
    try {
        const query = "SELECT * FROM article_tbl";
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get top 3 Articles
export const getTopArticles: RequestHandler = async (req, res) => {
    try {
        const query = "SELECT * FROM article_tbl LIMIT 3";
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a single article by ID
export const getArticleById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "SELECT * FROM article_tbl WHERE articleID = $1";
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "Article not found" });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update an article by ID
export const updateArticleById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author, main_image_url, related_articles } = req.body;
        const query = "UPDATE article_tbl SET title = $1, content = $2, author = $3, main_image_url = $4, related_articles = $5 WHERE articleID = $6 RETURNING *";
        const values = [title, content, author, main_image_url, related_articles, id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "Article not found" });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete an article by ID
export const deleteArticleById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM article_tbl WHERE articleID = $1 RETURNING *";
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "Article not found" });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
