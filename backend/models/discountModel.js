const mongoose = require('mongoose');

const discountSchema = mongoose.Schema({
    message: { type: String }
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
