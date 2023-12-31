const express = require('express');
const router = express.Router();
const {
    getServices,
    getSingleService,
    createService,
    deleteService
} = require('../controllers/serviceController')

router.get('/', getServices) 
router.get('/:id', getSingleService)
router.post('/', createService)
router.delete('/:id', deleteService)

module.exports = router;