db = db.getSiblingDB('restaurants_db');

db.restaurants.insertMany([
  {
    name: "Dominos",
    location: "Delhi",
    cuisine: "Pizza"
  },
  {
    name: "KFC",
    location: "Mumbai",
    cuisine: "Fast Food"
  }
]);