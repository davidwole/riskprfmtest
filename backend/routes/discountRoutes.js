const express = require('express');
const router = express.Router();
const {
    getDiscount,
    editDiscount,
    createDiscount
} = require('../controllers/discountController')

router.get('/', getDiscount) 
router.put('/:id', editDiscount)
router.post('/', createDiscount)

module.exports = router;
