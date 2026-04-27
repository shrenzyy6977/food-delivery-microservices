const seed = require('./seed');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Mongo connected");
    await seed();  
  });