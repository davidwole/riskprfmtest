import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

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