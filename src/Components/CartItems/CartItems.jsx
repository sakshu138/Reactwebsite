import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const {
    increment,
    decrement,
    getTotalCartAmount,
    all_product,
    cartItems,
    deleteFromCart,
    isLoggedIn,
  } = useContext(ShopContext);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (getTotalCartAmount() > 0) {
      const purchasedItems = Object.entries(cartItems)
        .filter(([_, quantity]) => quantity > 0)
        .map(([key, quantity]) => {
          const [itemId, size] = key.split("-");
          const product = all_product.find((e) => e.id === Number(itemId));
  
          return product
            ? {
                id: itemId,
                name: product.name,
                image: product.image,
                price: product.new_price,
                size: size,
                quantity: quantity,
                total: product.new_price * quantity,
                status: "Pending", // Mark as "Pending" before payment
              }
            : null;
        })
        .filter(Boolean);
  
      if (purchasedItems.length > 0) {
        const existingHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
        const newPurchase = {
          date: new Date().toISOString(),
          items: purchasedItems,
          total: getTotalCartAmount(),
          status: "Pending", // Mark entire order as "Pending"
        };
  
        localStorage.setItem("purchaseHistory", JSON.stringify([...existingHistory, newPurchase]));
        localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Keep cart data
      }
  
      if (isLoggedIn || storedUser) {
        navigate("/ShippingMethod"); // Move to Payment Page
      } else {
        localStorage.setItem("redirectAfterLogin", "/paymentMethod");
        alert("Please log in first!");
        navigate("/login");
      }
    } else {
      alert("Your cart is empty!");
    }
  };
  
  

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Size</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {Object.keys(cartItems).map((cartKey) => {
        const [itemId, size] = cartKey.split("-");
        const product = all_product.find((e) => e.id === Number(itemId));

        if (product && cartItems[cartKey] > 0) {
          return (
            <div key={cartKey}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={product.image}
                  alt={product.name}
                  className="carticon-product-icon"
                />
                <p>{product.name}</p>
                <p>${product.new_price}</p>
                <div className="cartitems-size">
                  <p>{size}</p>
                </div>

                <div className="cartitems-quantity">
                  <button onClick={() => decrement(itemId, size)}>-</button>
                  <span>{cartItems[cartKey]}</span>
                  <button onClick={() => increment(itemId, size)}>+</button>
                </div>

                <p>${product.new_price * cartItems[cartKey]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => deleteFromCart(itemId, size)}
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={getTotalCartAmount() <= 0}
            style={{
              backgroundColor: getTotalCartAmount() > 0 ? "#ff4c3b" : "#ccc",
              cursor: getTotalCartAmount() > 0 ? "pointer" : "not-allowed",
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cartitems-prompcode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;