import React, { useEffect } from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const Footer = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div className='footer'> 
      <div className='footer-logo' data-aos="fade-up">
        <img src={footer_logo} alt="Shopper Logo" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links" data-aos="fade-up">
        <li>Company</li>
        <li>Product</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon" data-aos="fade-up">
        <div className="footer-icons-container" data-aos="zoom-in">
            <img src={instagram_icon} alt='Instagram icon' />
        </div>
        <div className="footer-icons-container" data-aos="zoom-in">
            <img src={pintester_icon}  alt='Pintester icon' />
        </div>
        <div className="footer-icons-container" data-aos="zoom-in">
            <img src={whatsapp_icon} alt='Whatsapp icon' />
        </div>
      </div>
      <div className="footer-copyright" data-aos="fade-up">
        <hr />
        <p>Copyright @2025 - All rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
