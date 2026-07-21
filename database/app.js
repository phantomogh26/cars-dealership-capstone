const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const Dealer = require('./dealership');
const Review = require('./review');
const CarMake = require('./carmake');
const CarModel = require('./carmodel');

mongoose.connect('mongodb://localhost:27017/dealershipsDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Dealership Database Service');
});

// Lấy tất cả dealer
app.get('/fetchDealers', async (req, res) => {
  try {
    const dealers = await Dealer.find();
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy dealer theo id
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const dealer = await Dealer.find({ id: req.params.id });
    res.json(dealer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy dealer theo bang (state)
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const dealers = await Dealer.find({ state: req.params.state });
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy tất cả review
app.get('/fetchReviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy review theo dealer id
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const reviews = await Review.find({ dealership: req.params.id });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy tất cả car makes
app.get('/fetchCarMakes', async (req, res) => {
  try {
    const makes = await CarMake.find();
    res.json(makes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy tất cả car models
app.get('/fetchCarModels', async (req, res) => {
  try {
    const models = await CarModel.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Thêm review mới
app.post('/insert_review', async (req, res) => {
  const data = req.body;
  try {
    const lastReview = await Review.findOne().sort({ id: -1 });
    const newId = lastReview ? lastReview.id + 1 : 1;

    const newReview = new Review({
      id: newId,
      name: data.name,
      dealership: data.dealership,
      review: data.review,
      purchase: data.purchase,
      purchase_date: data.purchase_date,
      car_make: data.car_make,
      car_model: data.car_model,
      car_year: data.car_year,
    });

    const saved = await newReview.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Error inserting review', detail: err.message });
  }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Database service running on port ${PORT}`));
