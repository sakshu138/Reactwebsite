import React, { useContext, useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [priceRange, setPriceRange] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  
  const categoryFiltered = all_product.filter(item => item.category === props.category);


  useEffect(() => {
    let sortedArray = [...categoryFiltered];

    if (priceRange === "0-99") {
      sortedArray = sortedArray.filter(item => item.new_price >= 0 && item.new_price <= 99);
    } else if (priceRange === "100-200") {
      sortedArray = sortedArray.filter(item => item.new_price >= 100 && item.new_price <= 200);
    } else if (priceRange === "201-400") {
      sortedArray = sortedArray.filter(item => item.new_price >= 201 && item.new_price <= 400);
    } else if (priceRange === "401-600") {
      sortedArray = sortedArray.filter(item => item.new_price >= 401 && item.new_price <= 600);
    } else if (priceRange === "601-800") {
      sortedArray = sortedArray.filter(item => item.new_price >= 601 && item.new_price <= 800);
    } else if (priceRange === "800+") {
      sortedArray = sortedArray.filter(item => item.new_price > 800);
    }

    setFilteredProducts(sortedArray);
  }, [priceRange, all_product, props.category]);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt='' data-aos="fade-down" />
      
      <div className='shopcategory-indexsort'>
        <p>
          <span>Showing {filteredProducts.length} products</span> out of {categoryFiltered.length} products
        </p>
        
        <div className='shopcategory-sort' data-aos="fade-up">
          <span>Filter by Price:</span>
          <select className="price-filter" onChange={(e) => setPriceRange(e.target.value)}>
            <option value="all">All</option>
            <option value="0-99">₹0 - ₹99</option>
            <option value="100-200">₹100 - ₹200</option>
            <option value="201-400">₹201 - ₹400</option>
            <option value="401-600">₹401 - ₹600</option>
            <option value="601-800">₹601 - ₹800</option>
            <option value="800+">₹800 and above</option>
          </select>
        </div>
      </div>

      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <div key={i} data-aos="zoom-in-up"> 
            <Item 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;

