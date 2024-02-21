"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// TODO : Save the credential in Environment Variable
const pool = new pg_1.Pool({
    user: "default",
    password: "NKSx92feAJlh",
    host: "ep-delicate-bread-a1rmmtuu-pooler.ap-southeast-1.aws.neon.tech",
    port: 5432, // default PostgreSQL port
    database: "verceldb",
});
exports.default = pool;
