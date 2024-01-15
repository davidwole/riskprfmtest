import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../styles/Discount.css'

export default function Discount() {
    const [discountMessage, setDiscountMessage] = useState();

    const getDiscount = async () => {
        const response = await fetch('https://riskbackend.onrender.com/api/discount');
        const json = await response.json();

        setDiscountMessage(json[0].message);

    }

    useEffect(() => {
        getDiscount();
    }, [])

    return(
       <Link to='/appointment'>
            <div className="discount">
                <div className="marquee">
                    <p className="discount_text">{ discountMessage }</p>
                </div>
            </div>
       </Link>
    )
}
