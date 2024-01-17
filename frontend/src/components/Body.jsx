import '../styles/Body.css';
import {
    Routes,
    Route,
    Navigate,
  
  } from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/Login'
import Appointment from '../pages/Appointment';
import Service from '../pages/Service';
import Contact from '../pages/Contact';
import CreateAccount from '../pages/CreateAccount';
import Admin from '../pages/Admin';
import Register from '../pages/Register';
import ChangeDiscount from '../pages/ChangeDiscount';



export default function Body(){

  const user = JSON.parse(localStorage.getItem('user'));

    return(
       <div className='body'>
            <Routes>
            <Route path='/' element={user ? <Admin /> : <Home/>} />
            <Route path='/login' element={user ? <Navigate to='/' replace/> : <Login />} />
            <Route path='/appointment' element={!user ? <Appointment /> : <Navigate to='/' replace/>} />
            <Route path='/service' element={user ? <Service /> : <Navigate to='/' replace/>} />
            <Route path='/contact' element={!user ? <Contact /> : <Navigate to='/' replace/>} />
            <Route path='/create' element={user ? <CreateAccount /> : <Navigate to='/' replace/>} />
            <Route path='/changediscount' element={user ? <ChangeDiscount /> : <Navigate to='/' replace/>} />
            <Route path='/register/:token' element={!user ? <Register /> : <Navigate to='/' replace/>} />
            <Route path='/*' element={user ? <Admin /> : <Navigate to='/' replace/>} />
            </Routes>
       </div>
    )
} 
