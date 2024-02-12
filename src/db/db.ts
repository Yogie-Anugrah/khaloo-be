import { Pool } from "pg";

// TODO : Save the credential in Environment Variable
const pool = new Pool({
    user: "zfggiaiv",
    password: "Z-vyv5W0F1jc7ESiUbFFirOtFWF9MdVL",
    host: "rosie.db.elephantsql.com",
    port: 5432, // default PostgreSQL port
    database: "zfggiaiv",
});

export default pool;
