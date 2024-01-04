import React, { useState, useEffect } from 'react';

const Appoint = () => {
  const [data, setData] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    // Fetch data from your Express API endpoint
    fetch('api/cars')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleMakeChange = (event) => {
    const make = event.target.value;
    setSelectedMake(make);
    setSelectedModel('');
    setSelectedServices([]);
  };

  const handleModelChange = (event) => {
    const model = event.target.value;
    setSelectedModel(model);
    const car = data.find((c) => c.make === selectedMake);
    const selectedModelData = car.models.find((m) => m.model === model);
    setSelectedServices(selectedModelData ? selectedModelData.services : []);
  };

  return (
    <div>
      <label>Make</label>
      <select onChange={handleMakeChange} value={selectedMake}>
        <option value="">Select Make</option>
        {data.map((car) => (
          <option key={car.make} value={car.make}>
            {car.make}
          </option>
        ))}
      </select>

      {selectedMake && (
        <>
          <label>Model</label>
          <select onChange={handleModelChange} value={selectedModel}>
            <option value="">Select Model</option>
            {data
              .find((car) => car.make === selectedMake)
              .models.map((model) => (
                <option key={model.model} value={model.model}>
                  {model.model}
                </option>
              ))}
          </select>

          <label>Services</label>
          <select value={selectedServices}>
            {selectedServices.map((service, index) => (
              <option key={index}>{service.service}</option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default Appoint;
