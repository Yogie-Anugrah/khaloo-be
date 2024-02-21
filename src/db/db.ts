import { Pool } from "pg";

// TODO : Save the credential in Environment Variable
const pool = new Pool({
    user: "default",
    password: "NKSx92feAJlh",
    host: "ep-delicate-bread-a1rmmtuu-pooler.ap-southeast-1.aws.neon.tech",
    port: 5432, // default PostgreSQL port
    database: "verceldb",
 
});

export default pool;
