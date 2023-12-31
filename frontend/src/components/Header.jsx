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


    return(
        <header>
            <Link to='/'><h1 className='logo'>RiskPRFM</h1></Link>
            {user ? 
            <button onClick={logout}>Logout</button> :
            <ul className='links hide_for_mobile'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='#section1'>About</Link></li>
                <li><Link to='/#section2'>FAQs</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
            </ul>}
        </header>
    )
}