import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Mechanic from '../assets/main.png';
import { useState } from 'react';
import Discount from '../components/Discount';

export default function Home() {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user){
        window.location.assign('/');
    }


    const [activeIndex, setActiveIndex] = useState(null);

    const handleAccordionClick = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
    



    return(
        <div className='home'>
            <Discount />
            <div>
            <div className='headlines'>
                <h1>Precision Repairs, Personalized Care - Where Your Car Feels at Home.</h1>
                <p>Revitalize Your Ride, Restore Your Confidence.</p>
                <div className='headline_buttons'>
                    <button><Link to='/appointment'>Book Now</Link></button>
                    <button><a href='tel:2397660003'>Call Us</a></button>
                </div>
            </div>

            <div className='about_card'>
                <div>
                    <img src={Mechanic} alt='Mechanic'/>
                </div>

                <p>
                Welcome to Risk PRFM, where automotive excellence meets unmatched customer service. At Risk PRFM, we take pride in being your trusted partner on the road. With a passion for precision and a commitment to quality, our skilled technicians bring decades of experience to every vehicle that rolls into our shop.

            <span className='hide_for_mobile'>At the heart of our service philosophy is a dedication to transparency and integrity. We believe in open communication, ensuring you understand every step of the repair or maintenance process. From routine oil changes to complex engine diagnostics, we handle it all with precision and care.

            Equipped with state-of-the-art technology, our facility is designed to meet the evolving needs of modern vehicles. We source top-quality parts and employ the latest industry practices to deliver reliable and efficient solutions.

            Choose Risk PRFM for a seamless automotive experience that goes beyond the ordinary. Your satisfaction and the health of your vehicle are our top priorities. Drive with confidence – drive with Risk PRFM.</span>
                            </p>
            </div>

            <div className='faqs'>
                <h1>Frequently Asked Questions</h1>
                <div className='accordions'>
                    <div className='accordion'>
                        <div className='accordion_prompt' onClick={() => handleAccordionClick(0)}>                            
                            <p>How often should I get my car's oil changed?</p>
                            <p>+</p>
                        </div>

                        <div className={activeIndex !== 0 ? 'accordion_answer accordion_hide' : 'accordion_answer'}>
                            <p>It is generally recommended to change your car's oil every 3,000 to 5,000 miles or as specified in your vehicle's owner's manual. Regular oil changes help maintain engine health and extend the life of your vehicle.</p>
                        </div>
                    </div>
                    
                    <div className='accordion'>
                        <div className='accordion_prompt' onClick={() => handleAccordionClick(1)}>                            
                            <p>What are the signs that my brakes may need servicing?</p>
                            <p>+</p>
                        </div>

                        <div className={activeIndex !== 1 ? 'accordion_answer accordion_hide' : 'accordion_answer'}>
                            <p>Look out for warning signs such as squeaking or grinding noises, reduced braking performance, a soft brake pedal, or vibrations while braking. If you experience any of these issues, it's crucial to have your brakes inspected and serviced promptly.</p>
                        </div>
                    </div>
                </div>
                <div className='accordions'>
                    <div className='accordion'>
                        <div className='accordion_prompt' onClick={() => handleAccordionClick(2)}>                            
                            <p>How often should I rotate my tires?</p>
                            <p>+</p>
                        </div>

                        <div className={activeIndex !== 2 ? 'accordion_answer accordion_hide' : 'accordion_answer'}>
                            <p>Tire rotation is recommended every 6,000 to 8,000 miles or as advised in your vehicle's manual. Regular tire rotation helps ensure even tire wear, extends tire life, and improves overall performance and handling.</p>
                        </div>
                    </div>
                    
                    <div className='accordion'>
                        <div className='accordion_prompt' onClick={() => handleAccordionClick(3)}>                            
                            <p>What should I do if my check engine light comes on?</p>
                            <p>+</p>
                        </div>

                        <div className={activeIndex !== 3 ? 'accordion_answer accordion_hide' : 'accordion_answer'}>
                            <p>If your check engine light illuminates, it's essential to have your vehicle inspected as soon as possible. Ignoring the warning could lead to more significant issues. Our technicians can perform a diagnostic scan to identify the problem and provide recommendations for necessary repairs.

</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
