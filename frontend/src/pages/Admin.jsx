import { useState, useEffect } from 'react';
import '../styles/Admin.css';
import { Link } from 'react-router-dom';

export default function Admin() {

    const [appointments, setAppointments] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [services, setServices] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    const user = JSON.parse(localStorage.getItem('user'));
    
    if(!user) {
        window.location.assign('/login');
    }

    const handleTab = (index) => {
        setActiveTab(index);
    }

    const getAppointments = async(e) => {
        const response = await fetch('https://riskbackend.onrender.com/api/appointments');
        const json = await response.json();
        setAppointments(json);
    }

    const getAccounts = async(e) => {
        const response = await fetch('https://riskbackend.onrender.com/api/users');
        const json = await response.json();
        setAccounts(json);
    }

    const getServices = async(e) => {
        const response = await fetch('https://riskbackend.onrender.com/api/cars');
        const json = await response.json();
        setServices(json);
    }

    useEffect(() => {
        getAppointments();
        getAccounts();
    }, []);

    return(
        <div className='admin'>
            <div className="create_buttons">
                <button><Link to='/create'>Create New Account</Link></button>
                <button><Link to='/service'>Create New Service</Link></button>
            </div>

            <div className="tabs">
                <p className={activeTab == 0 && 'active'} onClick={() => handleTab(0)}>Appointments</p>
                <p className={activeTab == 1 && 'active'} onClick={() => handleTab(1)}>Accounts</p>
                <p className={activeTab == 2 && 'active'} onClick={() => handleTab(2)}>Services</p>
            </div>

            { activeTab == 0 && <table className='submitted_forms table_block'>
                    <thead>
                        <tr>                        
                            <th>Name</th>
                            <th>Service</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {services && services.map((service) => {
                            return(
                                <tr key={service._id}>
                                    <td>{ service.make }</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            }

            { activeTab == 1 &&      
                    <table className='submitted_forms table_block'>
                    <thead>
                        <tr>                        
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {accounts && accounts.map((account) => {
                            return(
                                <tr key={account._id}>
                                    <td>{ account.name }</td>
                                    <td>{ account.email }</td>                                
                                </tr>
                            )
                        })}

                    </tbody>
                </table>    
}

            { activeTab == 2 && <table className='submitted_forms table_block'>
                    <thead>
                        <tr>                        
                            <th>Name</th>
                            <th>Service</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {appointments && appointments.map((appointment) => {
                            return(
                                <tr key={appointment._id}>
                                    <td>{ appointment.name }</td>
                                    <td>{ appointment.service }</td>
                                    <td>{ appointment.date }</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            }

        </div>
    )
}
