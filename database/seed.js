const mongoose = require('mongoose');

const Dealer = require('./dealership');
const Review = require('./review');
const CarMake = require('./carmake');
const CarModel = require('./carmodel');

const dealerships = require('./data/dealerships.json');
const reviews = require('./data/reviews.json');
const carmakes = require('./data/carmakes.json');
const carmodels = require('./data/carmodels.json');

mongoose.connect('mongodb://localhost:27017/dealershipsDB')
  .then(async () => {
    console.log('Connected to MongoDB, seeding data...');

    await Dealer.deleteMany({});
    await Review.deleteMany({});
    await CarMake.deleteMany({});
    await CarModel.deleteMany({});

    await Dealer.insertMany(dealerships);
    await Review.insertMany(reviews);
    await CarMake.insertMany(carmakes);
    await CarModel.insertMany(carmodels);

    console.log('Seeding complete!');
    console.log(`Dealers: ${dealerships.length}`);
    console.log(`Reviews: ${reviews.length}`);
    console.log(`Car Makes: ${carmakes.length}`);
    console.log(`Car Models: ${carmodels.length}`);

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error seeding data:', err);
    process.exit(1);
  });
