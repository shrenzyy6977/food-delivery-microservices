const express = require('express');
const pool = require('../db');
const publishEvent = require('../events/publisher');
const { isValidTransition } = require('../utils/stateMachine');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, restaurantId, total } = req.body;

        const result = await pool.query(
            `INSERT INTO orders (user_id, restaurant_id, status, total)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [userId, restaurantId, 'PLACED', total]
        );

        const order = result.rows[0];

        await publishEvent({
            type: 'ORDER_PLACED',
            data: order
        });

        res.status(201).json(order);

    } catch (err) {
        res.status(500).json({ error: "Failed to create order" });
    }
});

router.get('/:id', async (req, res) => {
    const result = await pool.query(
        'SELECT * FROM orders WHERE id = $1',
        [req.params.id]
    );

    res.json(result.rows[0]);
});

router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        const result = await pool.query(
            'SELECT * FROM orders WHERE id = $1',
            [req.params.id]
        );

        const order = result.rows[0];

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (!isValidTransition(order.status, status)) {
            return res.status(400).json({ error: "Invalid status transition" });
        }

        const updated = await pool.query(
            'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
            [status, req.params.id]
        );

        const updatedOrder = updated.rows[0];

        await publishEvent({
            type: 'ORDER_STATUS_UPDATED',
            data: updatedOrder
        });

        res.json(updatedOrder);

    } catch (err) {
        res.status(500).json({ error: "Failed to update status" });
    }
});

module.exports = router;