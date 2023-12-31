import { useState } from 'react';
import '../styles/Service.css';

export default function Service() {
    const [price, setPrice] = useState('');

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    
    if(!user) {
        window.location.assign('/login');
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(price == '' || price[0] == ' '){
            setError('Please fill in all fields');

            setTimeout(() => {
                setError(false);
            }, 1800);

            return;
        }

        const service = {
            make: 'Toyota',
            model: 'Corrolla',
            service: 'Tyre Change',
            price
        }


        const response = await fetch('/api/services', {
            method: 'POST',
            body: JSON.stringify(service),
            headers: {
            'Content-Type': 'application/json'
            }
        });

        const json = response.json();

        if(response.ok){
            setPrice('');
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
                        <label className='password_label hide_for_mobile'>Make</label>
                        <select className='hide_for_mobile'>
                            <option></option>
                        </select>
                        <label className='password_label hide_for_mobile'>Model</label>
                        <select className='hide_for_mobile'>
                            <option></option>
                        </select>
                        <label className='password_label hide_for_mobile'>Service</label>
                        <select className='hide_for_mobile'>  
                            <option></option>
                        </select>
                        <label className='price_label hide_for_mobile'>Price</label>
                        <input className='hide_for_mobile' type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
                        <button className='submit_button hide_for_mobile' disabled={loading}>Create Service</button>

                        <label className='mobile_label'>Make</label>
                        <select>
                            <option></option>
                        </select>
                        <label className='mobile_label'>Model</label>
                        <select>
                            <option></option>
                        </select>
                        <label className='mobile_label'>Service</label>
                        <select>
                            <option></option>
                        </select>
                        <label className='mobile_label'>Price</label>
                        <input type='text'className='mobile_label' value={price} onChange={(e) => setPrice(e.target.value)} />
                        <button className='submit_button' disabled={loading}>Create Service</button>
                    </form>
                </div>
        </div>
    )
}