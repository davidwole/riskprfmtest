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
    const [selectedServices, setSelectedServices] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

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
            service: selectedServices,
            date
        }

        console.log(appointment);

        if(name == '' || name[0] == ' ' || email == '' || email[0] == ' ' || phone == '' || phone[0] == ' ' || date == '' || date[0] == ' '){
            setError('Please fill in all fields');

            setTimeout(() => {
                setError(false);
            }, 1800);

            return;
        }


        const response = await fetch('/api/appointments', {
            method: 'POST',
            body: JSON.stringify(appointment),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if(response.ok){
            setSuccess(true);
            setName('');
            setEmail('');
            setPhone('');
            setDate('');

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
                        <label className='hide_for_mobile email_label'>Name</label>
                        <input className='hide_for_mobile email_label' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                        <label className='hide_for_mobile email_label'>Email</label>
                        <input className='hide_for_mobile email_label' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label className='hide_for_mobile email_label'>Phone Number</label>
                        <input className='hide_for_mobile email_label' type='text' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        <label className='hide_for_mobile email_label'>Make</label>
                        <select className='hide_for_mobile email_label'>
                            <option></option>
                        </select>
                        <label className='hide_for_mobile email_label'>Model</label>
                        <select className='hide_for_mobile email_label'>
                            <option></option>
                        </select>
                        <label className='hide_for_mobile email_label'>Service</label>
                        <select className='hide_for_mobile email_label'>
                            <option></option>
                        </select>
                        <label className='hide_for_mobile email_label'>date</label>
                        <input  className='hide_for_mobile email_label' type='date' value={date} onChange={(e) => setDate(e.target.value)}/>

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

                        <label className='mobile_label'>Services</label>
                        <select value={selectedServices}>
                            {selectedServices.map((service, index) => (
                            <option key={index}>{service.service}</option>
                            ))}
                        </select>
                        </>
                    )}
                        <label className='mobile_label'>date</label>
                        <input type='date' value={date} onChange={(e) => setDate(e.target.value)}/>
                        <button className='submit_button' disabled={loading}>Get Free Quote</button>
                    </form>
                </div>
        </div>
    )
}