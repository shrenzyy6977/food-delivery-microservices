const Restaurant = require('./models/Restaurant');

async function seed() {
  const count = await Restaurant.countDocuments();

  if (count === 0) {
    await Restaurant.insertMany([
      { name: "Dominos", cuisine: "Pizza" },
      { name: "KFC", cuisine: "Chicken" }
    ]);
  }
}