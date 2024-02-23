"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// TODO : Save the credential in Environment Variable
const pool = new pg_1.Pool({
    user: "default",
    password: "7RrzJnDXOl5Y",
    host: "ep-silent-river-a4p7mg9w-pooler.us-east-1.aws.neon.tech",
    port: 5432, // default PostgreSQL port
    database: "verceldb",
    ssl: {
        // to do : change this to true when in production
        rejectUnauthorized: false
    }
});
exports.default = pool;
