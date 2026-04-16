const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    restaurantId: { type: String, required: true },
    name: String,
    price: Number,
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);