const express = require('express');
const router = express.Router();
const {
    getAppointments,
    getSingleAppointment,
    createAppointment,
    deleteAppointment
} = require('../controllers/appointmentController')

router.get('/', getAppointments);
router.get('/:id', getSingleAppointment);
router.post('/', createAppointment);
router.delete('/:id', deleteAppointment);


module.exports = router;
