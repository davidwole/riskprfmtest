import '../styles/InfoCard.css';
    
export default function InfoCard() {
    return(
        <div className="info_card hide_for_mobile">
            <ul>
                <li>(000)-0000-0000</li>
                <li>name@email.com</li>
                <li>123 Main Street, New York, NY, 10001.</li>
            </ul>
        </div>
    )
}