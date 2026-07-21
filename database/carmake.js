const mongoose = require('mongoose');

const CarMakeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('CarMake', CarMakeSchema);
