"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// TODO : Save the credential in Environment Variable
const pool = new pg_1.Pool({
    user: "zfggiaiv",
    password: "Z-vyv5W0F1jc7ESiUbFFirOtFWF9MdVL",
    host: "rosie.db.elephantsql.com",
    port: 5432, // default PostgreSQL port
    database: "zfggiaiv",
});
exports.default = pool;
