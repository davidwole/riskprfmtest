import { useState } from 'react';
import '../styles/ChangeDiscount.css'

export default function ChangeDiscount() {
    const [discountText, setDiscountText] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const form = {
            message: discountText
        }

        const response = await fetch('http://localhost:8080/api/discount/65a2893590413d029b38cc16', {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if(response.ok){
            setDiscountText('');
            setSuccess(true);
        }

        if(!response.ok){
            setError(json.error);
            console.log(json.error);
        }

        setLoading(false);
    }


    return(
        <div className='login_wrapper discount_form'>
            <form onSubmit={handleSubmit} className='login_form'>
            {error &&
                        <div className='error_indicator'>
                            <p>{ error }</p>
                        </div>}

                        {success && 
                            <div className='success_indicator'>
                                <p>Offer Changed Successfully.</p>
                            </div>
                        }
                <h1>Change Discount Offer</h1>
                <label className='label_discount'>New Discount Offer</label>
                <input type='text' value={discountText} onChange={(e) => setDiscountText(e.target.value)}/>
                <button className='submit'>{loading ? 'Loading...' : 'Submit' }</button>
            </form>
        </div>
    )
}
