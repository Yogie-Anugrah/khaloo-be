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
// app.ts
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db/db"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const locationRoutes_1 = __importDefault(require("./routes/locationRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const homeRoutes_1 = __importDefault(require("./routes/homeRoutes"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
const partnershipRoutes_1 = __importDefault(require("./routes/partnershipRoutes"));
const youtubeRoutes_1 = __importDefault(require("./routes/youtubeRoutes"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(errorMiddleware_1.errorMiddleware);
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
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
// All routes products table
app.use("/products", productRoutes_1.default);
// All routes events table
app.use("/events", eventRoutes_1.default);
// All routes location table
app.use("/locations", locationRoutes_1.default);
app.use("/home", homeRoutes_1.default);
app.use("/articles", articleRoutes_1.default);
app.use("/partnerships", partnershipRoutes_1.default);
app.use("/youtube", youtubeRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
