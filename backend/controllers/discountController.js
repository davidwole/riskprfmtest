const Discount = require('../models/discountModel');

const getDiscount = async (req, res) => {
    const discount = await Discount.find();

    res.status(200).json(discount);
}

const createDiscount = async (req, res) => {
    const discount = await Discount.create(req.body);

    res.status(200).json(discount);
}

const editDiscount = async (req, res) => {
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body);
    console.log(req.body.message)

    res.status(200).json(discount);
}

module.exports = {
    createDiscount,
    getDiscount,
    editDiscount
}
