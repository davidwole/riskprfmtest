import '../styles/Register.css';
import { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';

export default function Register() {
    const { token } = useParams();

    const user = JSON.parse(localStorage.getItem('user'));
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    if(user){
        window.location.assign('/');
    }

    const getEmail = async () => {
        const response = await fetch(`https://riskbackend.onrender.com/api/users/invite/${token}`);
        const json = await response.json();

        setEmail(json.email);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const newAccount = {
            name,
            email,
            password
        }

        if(name == '' || name[0] == ' ' || email == '' || email[0] == ' ' || password == '' || password[0] == ' '){
            setError('Please fill in all fields');

            setTimeout(() => {
                setError(false);
            }, 1800);

            return;
        }

        const response = await fetch(`https://riskbackend.onrender.comm/api/users/register/${token}`, {
            method: 'POST',
            body: JSON.stringify(newAccount),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if(response.ok){
            setSuccess(true);
            setLoading(true);
            setTimeout(() => {
                window.location.assign('/login');
            }, 1800)
        }

        if(!response.ok){
            setError(json.error)
        }

        setLoading(false);
    }

    useEffect(() => {
        getEmail();
    }, [])
    
    return(
        <div>
            <h1 className='register_title'>Create Credentials</h1>
            <form onSubmit={handleSubmit} className='register'>
                {error &&
                    <div className='error_indicator width'>
                        <p>{ error }</p>
                    </div>}
                {success && 
                    <div className='success_indicator width'>
                    <p>Account created Successfully.</p>
                    </div>
                }
                <label>Name</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                <label>Email</label>
                <input type='email' value={email} disabled={true} onChange={(e) => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='submit_button' disabled={loading}>{ loading ? 'Loading' : 'Create Account '}</button>
            </form>
        </div>
    )
}
