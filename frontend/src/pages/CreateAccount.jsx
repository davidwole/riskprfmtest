import { useState } from 'react';
import '../styles/CreateAccount.css';

export default function CreateAccount() {
    const [email, setEmail] = useState('');

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

        if(email == '' || email[0] == ''){
            setError('Please enter a valid email');
            setTimeout(() => {
                setError(false);
            }, 1800)
            setLoading(false);
            return;
        }

        const form = {
            email
        }

        const response = await fetch('https://riskprfm.onrender.com/api/users/invite', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
            'Content-Type': 'application/json'
            }
        });

        const json = response.json();

        if(response.ok){
            setEmail('');
            console.log(json);
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 1800);
        }

        if(!response.ok){
            setError(json.error)
        }

        setLoading(false);
    }

    return(
        <div>
             <h2 className='login_header'>Create Account</h2>
                <div className='login_wrapper'>
                    <form className='login_form' onSubmit={handleSubmit}>
                        {error &&
                        <div className='error_indicator'>
                            <p>{ error }</p>
                        </div>}

                        {success && 
                            <div className='success_indicator'>
                                <p>Invite Sent Successfully.</p>
                            </div>
                        }
                        
                        <label className='email_label hide_for_mobile'>Email</label>
                        <input className='hide_for_mobile' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button className='submit_button hide_for_mobile' disabled={loading}>Invite</button>

                    </form>
                </div>
        </div>
    )
}
