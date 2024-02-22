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
exports.deleteArticleById = exports.updateArticleById = exports.getArticleById = exports.getTopArticles = exports.getAllArticles = exports.createArticle = void 0;
const db_1 = __importDefault(require("../db/db"));
// Create a new article
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author, main_image_url, related_articles } = req.body;
        const query = "INSERT INTO article_tbl (title, content, author, main_image_url, related_articles) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [title, content, author, main_image_url, related_articles];
        const result = yield db_1.default.query(query, values);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createArticle = createArticle;
// Get all articles
const getAllArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "SELECT * FROM article_tbl";
        const result = yield db_1.default.query(query);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllArticles = getAllArticles;
// Get top 3 Articles
const getTopArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "SELECT * FROM article_tbl LIMIT 3";
        const result = yield db_1.default.query(query);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getTopArticles = getTopArticles;
// Get a single article by ID
const getArticleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = "SELECT * FROM article_tbl WHERE articleID = $1";
        const result = yield db_1.default.query(query, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "Article not found" });
        }
        else {
            res.status(200).json(result.rows[0]);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getArticleById = getArticleById;
// Update an article by ID
const updateArticleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content, author, main_image_url, related_articles } = req.body;
        const query = "UPDATE article_tbl SET title = $1, content = $2, author = $3, main_image_url = $4, related_articles = $5 WHERE articleID = $6 RETURNING *";
        const values = [title, content, author, main_image_url, related_articles, id];
        const result = yield db_1.default.query(query, values);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "Article not found" });
        }
        else {
            res.status(200).json(result.rows[0]);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateArticleById = updateArticleById;
// Delete an article by ID
const deleteArticleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = "DELETE FROM article_tbl WHERE articleID = $1 RETURNING *";
        const result = yield db_1.default.query(query, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: "Article not found" });
        }
        else {
            res.status(200).json(result.rows[0]);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteArticleById = deleteArticleById;
