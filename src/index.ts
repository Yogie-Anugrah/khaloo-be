// app.ts
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import pool from "./db/db";
import { errorMiddleware } from "./middleware/errorMiddleware";
import eventRoutes from "./routes/eventRoutes";
import locationRoutes from "./routes/locationRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();
const port = 3001;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

app.use("/products", productRoutes);
app.use("/events", eventRoutes);
app.use("/locations", locationRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
