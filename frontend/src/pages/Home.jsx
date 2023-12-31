import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Mechanic from '../assets/main.png';
import { useState } from 'react';
import { Element } from 'react-scroll';

export default function Home() {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user){
        window.location.assign('/admin');
    }


    const [activeIndex, setActiveIndex] = useState(null);

    const handleAccordionClick = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };


    return(
        <div className='home'>
            <div className='headlines'>
                <h1>Precision Repairs, Personalized Care - Where Your Car Feels at Home.</h1>
                <p>Revitalize Your Ride, Restore Your Confidence.</p>
                <div className='headline_buttons'>
                    <button><Link to='/appointment'>Book Now</Link></button>
                    <button><a href='tel:000000000000'>Call Us</a></button>
                </div>
            </div>


            <Element name="section1" className="element">
            <div className='about_card'>
                <div>
                    <img src={Mechanic} />
                </div>

                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis ex viverra consequat viverra. Pellentesque pellentesque malesuada libero, et vehicula elit. Mauris scelerisque magna in pretium viverra. Phasellus nec facilisis nunc, id consequat nibh. Nam elementum gravida pellentesque. Nullam sollicitudin lacus nisi, sed accumsan ligula euismod facilisis. Sed scelerisque pharetra efficitur. Nam euismod tellus nec consequat fringilla. Curabitur nec sapien ac velit pulvinar tempor et eget massa. Phasellus eu diam nunc. Nunc ut nulla accumsan, sodales odio laoreet, euismod augue. Donec cursus nibh eu posuere pretium. Vestibulum molestie suscipit mi. Aenean felis magna, gravida id libero a, aliquet vulputate turpis. Aenean sollicitudin libero a turpis condimentum maximus. Fusce auctor accumsan nulla sed ornare.
Ut non sapien vestibulum lorem fermentum dapibus ac sed diam. Praesent eget venenatis ex. Proin tincidunt, eros ac egestas dictum, ipsum mi cursus ante, et consequat augue urna eu est. Quisque placerat metus vitae lorem tempus, id pharetra
                </p>
            </div>
            </Element>

            <div className='faqs' id="section2">
                <h1>Frequently Asked Questions</h1>
                <div className='accordions'>
                    <div className='accordion'>
                        <div className='accordion_prompt' onClick={() => handleAccordionClick(0)}>                            
                            <p>Lorem ipsum dolor sit amet, consectetu?</p>
                            <p>+</p>
                        </div>

                        <div className={activeIndex != 0 ? 'accordion_answer accordion_hide' : 'accordion_answer'}>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis ex viverra consequat viverra. Pellentesque pellentesque malesuada libero, et vehicula elit. Mauris scelerisque magna in pretium viverra.</p>
                        </div>
                    </div>
                    
                    <div className='accordion'>
                        <div className='accordion_prompt' onClick={() => handleAccordionClick(1)}>                            
                            <p>Lorem ipsum dolor sit amet, consectetu?</p>
                            <p>+</p>
                        </div>

                        <div className={activeIndex != 1 ? 'accordion_answer accordion_hide' : 'accordion_answer'}>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis ex viverra consequat viverra. Pellentesque pellentesque malesuada libero, et vehicula elit. Mauris scelerisque magna in pretium viverra.</p>
                        </div>
                    </div>
                </div>
                <div className='accordions'>
                    <div className='accordion'>
                        <div className='accordion_prompt' onClick={() => handleAccordionClick(2)}>                            
                            <p>Lorem ipsum dolor sit amet, consectetu?</p>
                            <p>+</p>
                        </div>

                        <div className={activeIndex != 2 ? 'accordion_answer accordion_hide' : 'accordion_answer'}>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis ex viverra consequat viverra. Pellentesque pellentesque malesuada libero, et vehicula elit. Mauris scelerisque magna in pretium viverra.</p>
                        </div>
                    </div>
                    
                    <div className='accordion'>
                        <div className='accordion_prompt' onClick={() => handleAccordionClick(3)}>                            
                            <p>Lorem ipsum dolor sit amet, consectetu?</p>
                            <p>+</p>
                        </div>

                        <div className={activeIndex != 3 ? 'accordion_answer accordion_hide' : 'accordion_answer'}>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis ex viverra consequat viverra. Pellentesque pellentesque malesuada libero, et vehicula elit. Mauris scelerisque magna in pretium viverra.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}