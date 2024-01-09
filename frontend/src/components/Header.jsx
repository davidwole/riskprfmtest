import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react'


export default function Header() {
    const user = JSON.parse(localStorage.getItem('user'));

    const { dispatch } = useAuthContext();
    

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT'});
        window.location.assign('/')
    }

    const scrollToAbout = () => {
        window.scrollTo(0, 692)
    }

    const scrollToFAQ = () => {
        window.scrollTo(0, 1200)
    }

    const getConnection = async () => {
        const response = await fetch('https://riskbackend.onrender.com/connect');
        const json = await response.json();
        console.log(json);
    }

    useEffect(() => {
        getConnection();
    }, [])


    return(
        <header>
            <Link to='/'><h1 className='logo'>RiskPRFM</h1></Link>
            {user ? 
            <button onClick={logout}>Logout</button> :
            <ul className='links hide_for_mobile'>
                <li><Link to='/'>Home</Link></li>
                <li onClick={scrollToAbout}><Link to='/'>About</Link></li>
            <li onClick={scrollToFAQ}><Link to='/'>FAQs</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
            </ul>}
        </header>
    )
}
