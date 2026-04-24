require('dotenv').config();

const express = require('express');
const axios = require('axios');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(express.json());

app.use('/users', (req, res, next) => {
    if((req.path === '/login') || (req.path === '/register')) {
        return next();
    }

    authMiddleware(req, res, next);
}, async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://user-service:3005${req.originalUrl}`,
            data: req.body,
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization,
            },
        });

        res.status(response.status).json(response.data);
    } catch (err) {
        if (err.response) {
            return res.status(err.response.status).json(err.response.data);
        }
        res.status(500).json({ error: "Gateway error" });
    }
});

app.use('/restaurants', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://restaurant-service:3001${req.originalUrl}`,
            data: req.body,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        res.status(response.status).json(response.data);

    } catch (err) {
        if (err.response) {
            return res.status(err.response.status).json(err.response.data);
        }
        res.status(500).json({ error: "Gateway error" });
    }
});

app.use('/menu', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://menu-service:3002${req.originalUrl}`,
            data: req.body,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        res.status(response.status).json(response.data);

    } catch (err) {
        if (err.response) {
            return res.status(err.response.status).json(err.response.data);
        }

        res.status(500).json({ error: "Gateway error" });
    }
});

app.use('/orders', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://order-service:3003${req.originalUrl}`,
            data: req.body,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        res.status(response.status).json(response.data);

    } catch (err) {
        if (err.response) {
            return res.status(err.response.status).json(err.response.data);
        }

        res.status(500).json({ error: "Gateway error" });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});