import '../styles/Body.css';
import { useRef } from 'react';
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


export default function Body(){

  const user = JSON.parse(localStorage.getItem('user'));

    return(
       <div className='body'>
            <Routes>
            <Route path='/' element={user ? <Admin /> : <Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/appointment' element={<Appointment />} />
            <Route path='/service' element={<Service />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/create' element={<CreateAccount />} />
{/*             <Route path='/admin' element={<Admin />} /> */}
            <Route path='/register/:token' element={<Register />} />
            <Route path='/*' element={user ? <Admin /> : <Home />} />
            </Routes>
       </div>
    )
} 
