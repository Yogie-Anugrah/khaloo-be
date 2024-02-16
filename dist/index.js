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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db/db"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
// add route to check db is alive
app.get("/db", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query("SELECT NOW()");
        res.send(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}));
// add route to get all products return id, name, image, price, exist, flag
app.get("/product-list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query("SELECT prod_id, prod_name, prod_exist, prod_main_img, prod_price, prod_flag FROM prod_tbl");
        res.send(results.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}));
// add route to get product by id
app.get("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const results = yield db_1.default.query("SELECT prod_id, prod_price, prod_name, prod_main_img, prod_desc FROM prod_tbl WHERE prod_id = $1", [id]);
        res.send(results.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}));
// add route to get product images by id
app.get("/product/:id/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const results = yield db_1.default.query("SELECT * FROM product_pict_id WHERE prod_id = $1", [id]);
        res.send(results.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}));
// add route to get product's id to use on generating Static Params
app.get("/products-id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query("SELECT prod_id FROM prod_tbl");
        res.send(results.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}));
// add route to get product's id to use on generating metadata
app.get("/product-metadata/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const results = yield db_1.default.query("SELECT prod_name FROM prod_tbl WHERE prod_id = $1", [id]);
        res.send(results.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
