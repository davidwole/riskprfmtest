const Service = require("../models/serviceModel");

const getServices = async(req, res) => {
    const Services = await Service.find();

    res.status(200).json(Services)
}

const getSingleService = async(req, res) => {
    const allServices = await Service.findById(req.params.id);

    res.json(allServices)
}

const createService = async(req, res) => {
    const newService = await Service.create(req.body);

    res.json(newService);
}

const deleteService = async(req, res) => {
    const deleteService = await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({message: 'User deleted successfully'});
}

module.exports = {
    getServices,
    getSingleService,
    createService,
    deleteService
}