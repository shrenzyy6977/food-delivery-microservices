const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

async function seed() {
  const count = await MenuItem.countDocuments();

  if (count === 0) {
    await MenuItem.insertMany([
      { restaurantId: "1", name: "Burger", price: 120 },
      { restaurantId: "2", name: "Pizza", price: 250 }
    ]);
    console.log("Menu seeded");
  } else {
    console.log("Menu already exists");
  }
}

module.exports = seed;