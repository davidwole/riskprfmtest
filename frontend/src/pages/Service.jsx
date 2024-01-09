import { useState, useEffect } from 'react';
import '../styles/Service.css';
import { carData } from '../carData.js';

export default function Service() {

    const user = JSON.parse(localStorage.getItem('user'));
    
    if(!user) {
        window.location.assign('/login');
    }
    

    const [price, setPrice] = useState('');
    const [service, setService] = useState('');

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);


    const [selectedMake, setSelectedMake] = useState(undefined);
    const [selectedModel, setSelectedModel] = useState('');
    const [makeSelected, setMakeSelected] = useState(false);


    const uniqueMakes = [...new Set(carData.map(car => car.make))].sort();
    const modelsByMake = carData.reduce((models, car) => {
    models[car.make] = models[car.make] || [];
    models[car.make].push(car.model);
    return models;
    }, {});



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = {
            make: selectedMake,
            model: selectedModel,
            service,
            price
        }
        


        if(price == '' || price[0] == ' '){
            setError('Please fill in all fields');

            setTimeout(() => {
                setError(false);
            }, 1800);

            return;
        }


        const response = await fetch('https://riskbackend.onrender.com/api/cars', {
            method: 'POST',
            body: JSON.stringify(result),
            headers: {
            'Content-Type': 'application/json'
            }
        });

        const json = response.json();
        console.log(json);

        if(response.ok){
            setPrice('');
            setSelectedMake('');
            setSelectedModel('');
            setService('');
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 1800);
        }

        setLoading(false);
    }





    return(
        <div>
             <h2 className='login_header'>Create Service</h2>
                <div className='login_wrapper'>
                    <form className='login_form' onSubmit={handleSubmit}>
                        {error &&
                        <div className='error_indicator'>
                            <p>{ error }</p>
                        </div>}
                        {success && 
                            <div className='success_indicator'>
                                <p>Appointment created Successfully.</p>
                            </div>
                        }

                        <label className='password_label '>Make</label>
                            <select className='' value={selectedMake} onChange={(e) => {
                                setSelectedMake(e.target.value);
                                setSelectedModel(modelsByMake[e.target.value][0]); // Set first model
                                setMakeSelected(true);
                                }}>
                                <option value="" disabled={makeSelected}>Select a Make</option>
                                {uniqueMakes.map((make) => (
                                    <option key={make} value={make}>
                                    {make}
                                    </option>
                                ))}
                            </select>
                        { makeSelected && (
                        <>
                        <label className='password_label '>Model</label>
                        <select className='' value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                            {Array.from(new Set(modelsByMake[selectedMake])).map((model) => (
                                <option key={model} value={model}>
                                {model}
                                </option>
                                ))}
                        </select>
                    
                        <label className='password_label '>Service</label>
                        <input type='text' value={service} onChange={(e) => setService(e.target.value)} /> 
                        </>
                        )}

                        <label className='price_label '>Price</label>
                        <input className='' type='text' value={price} onChange={(e) => setPrice(e.target.value)} />

                        <button className='submit_button ' disabled={loading}>Create Service</button>


                    </form>

                </div>
        </div>
    )
}
