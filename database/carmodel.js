const mongoose = require('mongoose');

const CarModelSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  car_make_id: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  year: { type: Number, required: true },
});

module.exports = mongoose.model('CarModel', CarModelSchema);
