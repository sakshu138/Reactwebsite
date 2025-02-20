import React, { useState, useContext, useRef } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const navigate = useNavigate();
  const toastShownRef = useRef(false); 

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const showToast = (type, message) => {
    if (!toastShownRef.current) {
      toastShownRef.current = true;
      toast[type](message, { position: "top-right", autoClose: 2000 });
      setTimeout(() => {
        toastShownRef.current = false; 
      }, 2000);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("warn", "Please select a size!");
      return;
    }
    addToCart(product.id, selectedSize);
    showToast("success", "Added to cart successfully!");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      showToast("warn", "Please select a size!");
      return;
    }

    const order = {
      date: new Date().toISOString(),
      total: product.new_price,
      status: "Pending",
      items: [
        {
          name: product.name,
          image: product.image,
          price: product.new_price,
          quantity: 1,
          size: selectedSize,
          total: product.new_price,
          status: "Pending",
        },
      ],
    };

    const existingHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    existingHistory.push(order);
    localStorage.setItem("purchaseHistory", JSON.stringify(existingHistory));

    navigate("/shippingmethod", {
      state: {
        productId: product.id,
        productName: product.name,
        productPrice: product.new_price,
        selectedSize: selectedSize,
        isBuyNow: true,
      },
    });
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {[...Array(4)].map((_, index) => (
            <img key={index} src={product.image} alt={`Product view ${index + 1}`} />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="Main product" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          {[...Array(4)].map((_, index) => (
            <img key={index} src={star_icon} alt="Star rating" />
          ))}
          <img src={star_dull_icon} alt="Dull star rating" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ex eum itaque unde enim quam recusandae ab vero? Commodi enim soluta facere doloribus harum, itaque quas perferendis nostrum tempore at.
        </div>
        <div className="productdisplay-right-sizes">
          {sizes.map((size) => (
            <div
              key={size}
              className={`size-option ${selectedSize === size ? "active" : ""}`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </div>
          ))}
        </div>
        <div className="button-container" style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleAddToCart}>ADD TO CART</button>
          <button onClick={handleBuyNow} style={{ fontSize: "16px" }}>BUY NOW</button>
        </div>
        <p className="productdisplay-right-category"><span>Category :</span> Women, T-Shirt, Crop Top</p>
        <p className="productdisplay-right-category"><span>Tags :</span> Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
