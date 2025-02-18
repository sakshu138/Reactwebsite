import React, { useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import data_product from "../Assets/data";
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const Popular = () => {
  
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div className='popular'>
      <h1 data-aos="fade-up">POPULAR IN WOMEN</h1>
      <hr data-aos="fade-up" />
      <div className='popular-item'>
        {
          data_product.map((item, i) => (
            <div key={i} data-aos="zoom-in-up"> 
              <Item 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                new_price={item.new_price} 
                old_price={item.old_price} 
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Popular;
