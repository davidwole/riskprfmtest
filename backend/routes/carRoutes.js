const express = require('express');
const router = express.Router();
const {
  createNewService,
  getCreatedServices
} = require('../controllers/carController');

router.get('/', getCreatedServices);
router.post('/', createNewService);

module.exports = router; 