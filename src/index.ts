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

// add route to get all products return id, name, image, price, exist, flag
app.get("/product-list", async (req, res) => {
    try {
        const results = await pool.query("SELECT prod_id, prod_name, prod_exist, prod_main_img, prod_price, prod_flag FROM prod_tbl");
        res.send(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// add route to get product by id
app.get("/product/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const results = await pool.query("SELECT prod_id, prod_price, prod_name, prod_main_img, prod_desc FROM prod_tbl WHERE prod_id = $1", [id]);
        res.send(results.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// add route to get product images by id
app.get("/product/:id/images", async (req, res) => {
    try {
        const { id } = req.params;
        const results = await pool.query("SELECT * FROM product_pict_id WHERE prod_id = $1", [id]);
        res.send(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// add route to get product's id to use on generating Static Params
app.get("/products-metadata", async (req, res) => {
    try {
        const results = await pool.query("SELECT prod_id, prod_name FROM prod_tbl");
        res.send(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
