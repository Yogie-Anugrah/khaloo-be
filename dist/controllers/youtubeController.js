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
exports.deleteYoutubeVideo = exports.updateYoutubeVideo = exports.createYoutubeVideo = exports.getYoutubeVideoById = exports.getTopYoutubeVideos = exports.getAllYoutubeVideos = void 0;
const db_1 = __importDefault(require("../db/db"));
// Get all Youtube videos
const getAllYoutubeVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield db_1.default.query("SELECT * FROM YoutubeVideo");
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllYoutubeVideos = getAllYoutubeVideos;
// Get top 5 Youtube Videos
const getTopYoutubeVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield db_1.default.query("SELECT * FROM YoutubeVideo WHERE isActive = true LIMIT 5");
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getTopYoutubeVideos = getTopYoutubeVideos;
// Get a specific Youtube video by videoID
const getYoutubeVideoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoID } = req.params;
    try {
        const { rows } = yield db_1.default.query("SELECT * FROM YoutubeVideo WHERE videoID = $1", [videoID]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Youtube video not found" });
        }
        else {
            res.json(rows[0]);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getYoutubeVideoById = getYoutubeVideoById;
// Create a new Youtube video
const createYoutubeVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { youtubeLink, title, description, thumbnailUrl, isActive } = req.body;
    try {
        const { rows } = yield db_1.default.query("INSERT INTO YoutubeVideo (youtubeLink, title, description, thumbnailUrl, isActive) VALUES ($1, $2, $3, $4, $5) RETURNING *", [youtubeLink, title, description, thumbnailUrl, isActive]);
        res.status(201).json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createYoutubeVideo = createYoutubeVideo;
// Update an existing Youtube video
const updateYoutubeVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoID } = req.params;
    const { youtubeLink, title, description, thumbnailUrl, isActive } = req.body;
    try {
        const { rows } = yield db_1.default.query("UPDATE YoutubeVideo SET youtubeLink = $1, title = $2, description = $3, thumbnailUrl = $4, isActive = $5 WHERE videoID = $6 RETURNING *", [youtubeLink, title, description, thumbnailUrl, isActive, videoID]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Youtube video not found" });
        }
        else {
            res.json(rows[0]);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateYoutubeVideo = updateYoutubeVideo;
// Delete a Youtube video
const deleteYoutubeVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoID } = req.params;
    try {
        const { rows } = yield db_1.default.query("DELETE FROM YoutubeVideo WHERE videoID = $1 RETURNING *", [videoID]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Youtube video not found" });
        }
        else {
            res.json({ message: "Youtube video deleted successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteYoutubeVideo = deleteYoutubeVideo;
