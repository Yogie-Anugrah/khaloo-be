import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import pool from "./db/db";

const app = express();
const port = 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// add route to check db is alive
app.get("/db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.send(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/products-list", async (req, res) => {
    try {
        const results = await pool.query("SELECT prod_id, prod_name, prod_exist, prod_main_img, prod_price, prod_flag FROM prod_tbl");

        res.send(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/product/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const results = await pool.query("SELECT prod_id, prod_price, prod_name, prod_main_img, prod_desc FROM prod_tbl WHERE prod_id = $1", [id]);
        const data = results.rows[0];
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
