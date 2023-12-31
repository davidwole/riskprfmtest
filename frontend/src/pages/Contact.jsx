import { useState } from 'react';
import '../styles/Contact.css';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    if(user){
        window.location.assign('/admin');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if(name == '' || name[0] == '' || email == '' || email[0] == '' || message == '' || message[0] == '') {
            setError('Please fill in all fields');

            setTimeout(() => {
                setError(false);
            }, 1800)
            return;
        }

        const form = {
            name,
            email, 
            message
        }

        const response = await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            setSuccess(true);

            setName('');
            setEmail('');
            setMessage('');
        }

        setLoading(false)
    }

    return(
        <div>
             <h2 className='login_header'>Send us a Message</h2>
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
                        <label className='email_label hide_for_mobile'>Name</label>
                        <input className='email_label hide_for_mobile' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                        
                        <label className='email_label hide_for_mobile'>Email</label>
                        <input className='email_label hide_for_mobile'type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        
                        <label className='email_label hide_for_mobile'>Message</label>
                        <textarea className='email_label hide_for_mobile'value={message} onChange={(e) => setMessage(e.target.value)}> 

                        </textarea>

                        <label className='mobile_label'>Name</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                        
                        <label className='mobile_label'>Email</label>
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        
                        <label className='mobile_label'>Message</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)}> 

                        </textarea>
                        
                        <button className='submit_button' disabled={loading}>Get Free Quote</button>
                    </form>
                </div>
        </div>
    )
}