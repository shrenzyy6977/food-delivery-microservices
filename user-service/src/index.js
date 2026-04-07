require('dotenv').config();

const express = require('express');
const pool = require('./db');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.json());

pool.connect()
    .then(() => console.log("PostgreSQL connected"))
    .catch(err => console.error("DB connection error:", err));

app.use('/users', userRoutes);

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});