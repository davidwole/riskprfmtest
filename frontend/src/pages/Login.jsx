import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import '../styles/Login.css'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {error, loading, login} = useLogin();
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    if(user) {
        window.location.assign('/admin');
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }
    return(
        <div>

            <div className='login'>
                <h2 className='login_header'>Login</h2>
                <div className='login_wrapper'>
                    <form className='login_form' onSubmit={handleSubmit}>
                        {error &&
                        <div className='error_indicator'>
                            <p>{ error }</p>
                        </div>}
                        <label className='email_label'>Email</label>
                        <input className='' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label className='password_label'>Password</label>
                        <input className='' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button className='submit_button' disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
                        {/*  <div className='login_mobile_form'>
                            <input type='text' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button className='submit_button' disabled={loading} onClick={handleSubmit}>{ loading ? "Loading..." : "Login"}</button>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}
