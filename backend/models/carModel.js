// carModel.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  price: Number,
  service: String,
});

const modelSchema = new mongoose.Schema({
  model: String,
  services: [serviceSchema],
});

const carSchema = new mongoose.Schema({
  make: String,
  models: [modelSchema],
});

module.exports = mongoose.model('Car', carSchema);

