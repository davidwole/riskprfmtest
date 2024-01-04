const mongoose = require('mongoose');

const makeSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  models: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model', // Reference to Model Schema
    required: true,
  }],
});

module.exports = mongoose.model('Make', makeSchema);

