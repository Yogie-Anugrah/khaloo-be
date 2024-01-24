import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pool from './db/db';

const app = express();
const port = 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// add route to check db is alive
app.get('/db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
