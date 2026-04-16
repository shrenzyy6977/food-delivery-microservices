require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const menuRoutes = require('./routes/menu');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected (menu-service)"))
    .catch(err => console.log("Mongo error: ", err));

app.use('/menu', menuRoutes);

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Menu Service running on ${PORT}`);
});