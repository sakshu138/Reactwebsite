import React, { useEffect } from 'react';
import './NewCollection.css';
import new_collection from "../Assets/new_collections";
import Item from '../Item/Item';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const NewCollection = () => {
  
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  window.scrollTo(0,0)
  }, []);

  return (
    <div className='new-collections'>
      <h1 data-aos="fade-up">NEW COLLECTIONS</h1>
      <hr data-aos="fade-up" />
      <div className='collection'>
        {
          new_collection.map((item, i) => (
            <div key={i} data-aos="zoom-in-up"> 
              <Item 
                id={item.id} 
                name={item.name} 
                image={item.image } 
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

export default NewCollection;
