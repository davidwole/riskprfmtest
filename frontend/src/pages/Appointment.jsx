import { useState, useEffect } from 'react';
import '../styles/Appointment.css';

export default function Appointment() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([]);
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        // Fetch data from your Express API endpoint
        fetch('https://riskbackend.onrender.com/api/cars')
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
    
    
    if(user) {
        window.location.assign('/admin');
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const appointment = {
            name,
            email,
            phone,
            make: selectedMake,
            model: selectedModel,
            service: selectedService,
            date
        }


        if(name == '' || name[0] == ' ' || email == '' || email[0] == ' ' || phone == '' || phone[0] == ' ' || date == '' || date[0] == ' '){
            setError('Please fill in all fields');

            setTimeout(() => {
                setError(false);
            }, 1800);

            return;
        }


        const response = await fetch('https://riskbackend.onrender.com/api/appointments/', {
            method: 'POST',
            body: JSON.stringify(appointment),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if(response.ok){
            window.scrollTo(0, 10);
            setSuccess(true);
            setName('');
            setEmail('');
            setPhone('');
            setDate('');
            setSelectedMake('');
            setSelectedModel('');
            setSelectedService('');

            setTimeout(() => {
                setSuccess(false);
            }, 1800);
        }

        setLoading(false);
    }

    return(
        <div>
             <h2 className='login_header'>Book an Appointment</h2>
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

                        <label className='mobile_label'>Name</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                        <label className='mobile_label'>Email</label>
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label className='mobile_label'>Phone Number</label>
                        <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        <label className='mobile_label'>Make</label>
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
                        <label className='mobile_label'>Model</label>
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

                        </>
                    )}
                    {selectedModel && (
                        <>
                            <label className='mobile_label'>Services</label>
                            <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                            <option value="">Select Service</option>
                                {selectedServices.map((service, index) => (
                                <option key={index}>{service.service}</option>
                                ))}
                            </select>
                        </>
                    )}
                        <label className='mobile_label'>Date</label>
                        <input type='date' value={date} onChange={(e) => setDate(e.target.value)}/>
                        <button className='submit_button' disabled={loading}>{ loading ? 'Loading...' : 'Get Free Quote'}</button>
                    </form>
                </div>
        </div>
    )
}
