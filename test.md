This is what the body looks like when it is sent
    const body = {
        make,
        model,
        service,
        price
    }

but I want specific instructions to be followed when populating, If make does not already exists create a new make, create a new model and create a service, with the price, if make already exists but a model for that particular make does not already exists create a new model and populate the data accordingly, but if the model already exist, create a new service with the price