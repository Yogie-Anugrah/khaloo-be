// app.ts
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import pool from "./db/db";
import { errorMiddleware } from "./middleware/errorMiddleware";
import eventRoutes from "./routes/eventRoutes";
import locationRoutes from "./routes/locationRoutes";
import productRoutes from "./routes/productRoutes";
import homeRoutes from "./routes/homeRoutes";
import articleRoutes from "./routes/articleRoutes";
import partnershipRoutes from "./routes/partnershipRoutes";
import youtubeRoutes from "./routes/youtubeRoutes";

const app = express();
const port = 3001;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.send(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// All routes products table
app.use("/products", productRoutes);

// All routes events table
app.use("/events", eventRoutes);

// All routes location table
app.use("/locations", locationRoutes);
app.use("/home", homeRoutes);
app.use("/articles", articleRoutes);
app.use("/partnerships", partnershipRoutes);
app.use("/youtube", youtubeRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});