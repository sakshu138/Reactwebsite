import React, { useEffect } from 'react';
import exclucive_image from '../Assets/exclusive_image.png';
import './Offer.css';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const Offer = () => {
  
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div className='offers'>
      <div className='offers-left' data-aos="fade-right">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button data-aos="fade-up">Check Now</button>
      </div>
      <div className='offers-right' data-aos="fade-left">
        <img src={exclucive_image} alt='' />
      </div>
    </div>
  );
}

export default Offer;
