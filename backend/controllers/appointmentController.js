const Appointment = require("../models/appointmentModel");

const getAppointments = async(req, res) => {
    const Appointments = await Appointment.find();

    res.json(Appointments)
}

const getSingleAppointment = async(req, res) => {
    const singleAppointment = await Appointment.findById(req.params.id);

    res.json(singleAppointment)
}

const createAppointment = async(req, res) => {
    const newAppointment = await Appointment.create(req.body);

    res.json(newAppointment);
}

const deleteAppointment = async(req, res) => {
    const deleteAppointment = await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({message: 'User deleted successfully'});
}

module.exports = {
    getAppointments,
    getSingleAppointment,
    createAppointment,
    deleteAppointment
}