const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    model: {
      type: String,
      required: true,
    },
    services: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service', // Reference to Service Schema
      required: true,
    }],
  });
  
  module.exports = mongoose.model('Model', modelSchema);