const Car = require('../models/carModel');

const createNewService = async (req, res) => {

  
    try {
      const { make, model, service, price } = req.body;
  
      let car = await Car.findOne({ make });

      console.log(car);

  
      if (!car) {
        // If make doesn't exist, create a new make, model, and service
        car = new Car({
          make,
          models: [
            {
              model,
              services: [{ price, service }],
            },
          ],
        });

        console.log(car);
      } else {
        const existingModel = car.models.find((m) => m.model === model);
  
        if (!existingModel) {
          // If make exists but model doesn't exist, create a new model and service
          car.models.push({
            model,
            services: [{ price, service }],
          });
        } else {
          // If both make and model exist, add a new service
          existingModel.services.push({ price, service });
        }
      }
  
      await car.save();
      res.status(201).json(car);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const getCreatedServices = async (req, res) => {

  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



module.exports = {
  createNewService,
  getCreatedServices
}