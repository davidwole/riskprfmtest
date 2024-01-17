import '../styles/Footer.css';

export default function Footer() {
    return(
        <footer>
            <div className='footer'>
                <ul>
                    <li>Contact</li>
                    <li>(239)-766-0003</li>
                    <li>riskperfomancellc@gmail.com</li>
                </ul>

                <ul>
                    <li>Visit</li>
                    <li>4417 NE 14th Place, Cape Coral FL 33909</li>
                </ul>

                <ul>
                    <li>Social</li>
                    <li><a target='_blank' href='https://twitter.com'>Twitter</a></li>
                    <li><a target='_blank' href='https://instagram.com'>Instagram</a></li>
                </ul>
            </div>
            <p className='copyright'>&#169;RiskPFRM 2024 - All Rights Are Reserved</p>
        </footer>
    )
}
