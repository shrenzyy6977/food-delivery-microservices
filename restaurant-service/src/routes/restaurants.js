const express = require('express');
const Restaurant = require('../models/Restaurant');

const router = express.Router();

router.get('/', async (req, res) => {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
});

router.post('/', async (req, res) => {
    const { name, cuisine } = req.body;

    const restaurant = new Restaurant({ name, cuisine });
    await restaurant.save();

    res.status(201).json(restaurant);
});

router.patch('/:id/status', async (req, res) => {
    const { isOpen } = req.body;

    const updated = await Restaurant.findByIdAndUpdate(
        req.params.id,
        { isOpen },
        { new: true }
    );

    res.json(updated);
});

module.exports = router;