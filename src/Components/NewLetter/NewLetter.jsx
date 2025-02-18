import React, { useEffect } from 'react';
import './NewLetter.css';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const NewLetter = () => {
  
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div className='newletter'>
      <h1 data-aos="fade-up">Get Exclusive Offer On Your Email</h1>
      <p data-aos="fade-up">Subscribe to our newsletter and stay updated</p>

      <div data-aos="zoom-in-up">
        <input type='email' placeholder='Your Email id' />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default NewLetter;
