require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const restaurantRoutes = require('./routes/restaurants');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));


app.use('/restaurants', restaurantRoutes);

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Restaurant Service running on port ${PORT}`);
});