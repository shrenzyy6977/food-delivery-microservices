require('dotenv').config();

const express = require('express');

const orderRoutes = require('./routes/orders');

const app = express();
app.use(express.json());

app.use('/orders', orderRoutes);

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});