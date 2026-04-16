const express = require('express');
const redis = require('../cache/redis');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

router.get('/:restaurantId', async (req, res) => {
    const { restaurantId } = req.params;

    const cacheKey = `menu:${restaurantId}`;

    const cached = await redis.get(cacheKey);

    if (cached) {
        return res.json(JSON.parse(cached));
    }

    const items = await MenuItem.find({ restaurantId });

    await redis.set(cacheKey, JSON.stringify(items), 'EX', 60);

    res.json(items);
});

router.post('/:restaurantId/items', async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { name, price } = req.body;

        const item = new MenuItem({
            restaurantId,
            name,
            price
        });

        await item.save();
        
        const cacheKey = `menu:${restaurantId}`;
        await redis.del(cacheKey);

        res.status(201).json(item);

    } catch (err) {
        res.status(500).json({ error: "Failed to create menu item" });
    }
});

module.exports = router;