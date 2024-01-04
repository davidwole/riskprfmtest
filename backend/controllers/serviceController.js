const Service = require("../models/serviceModel");
const Make = require('../models/makeModel');
const Model = require('../models/modelModel');



const getServices = async(req, res) => {
    // const Services = await Service.find();

    // res.status(200).json(Services)

    const makes = await Make.find().populate('models');
    res.json(makes);
}

const getSingleService = async(req, res) => {
    const allServices = await Service.findById(req.params.id);

    res.json(allServices)
}

const createService = async(req, res) => {
    const { make, model, service, price } = req.body;

    try {
        // Check for existing Make
        const existingMake = await Make.findOne({ make });

        if (!existingMake) {
        // Create new Make and Model
        const newMake = new Make({ make });
        const newModel = new Model({ model });
        const newService = new Service({ service, price });


        newModel.services.push(newService);
        newMake.models.push(newModel);

        await newMake.save();

        res.json({ message: 'Make, model, and service created successfully.' });
        } else {
        // Check for existing Model within the Make
        const existingModel = await Model.findOne({ model, make: existingMake._id });

        if (!existingModel) {
            // Create new Model and Service
            const newModel = new Model({ model });
            const newService = new Service({ service, price });

            newModel.services.push(newService);
            existingMake.models.push(newModel);

            await existingMake.save();

            res.json({ message: 'Model and service created successfully.' });
        } else {
            // Create new Service for existing Model
            const newService = new Service({ service, price });
            existingModel.services.push(newService);

            await existingModel.save();

            res.json({ message: 'Service created successfully.' });
        }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating data.' });
    }
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