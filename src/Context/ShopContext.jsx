
import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  all_product.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};
const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [selectedSizes, setSelectedSizes] = useState({});
  const [orderHistory, setOrderHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("orderHistory")) || [];
  });


  useEffect(() => {
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
  }, [orderHistory]);


    const placeOrder = () => {
      if (Object.keys(cartItems).length === 0) return;
  
      let newOrders = [];
      for (const cartKey in cartItems) {
        if (cartItems[cartKey] > 0) {
          const [itemId, size] = cartKey.split('-');
          let itemInfo = all_product.find((product) => product.id === Number(itemId));
  
          newOrders.push({
            id: itemId,
            name: itemInfo.name,
            price: itemInfo.new_price,
            size: size,
            quantity: cartItems[cartKey],
            date: new Date().toLocaleString(),
          });
        }
      }
  
      setOrderHistory((prev) => [...newOrders, ...prev]); 
      setCartItems({}); 
    };


  
  const addToCart = (itemId, size) => {
    const cartKey =` ${itemId}-${size}`;

    setCartItems((prev) => {
      if (prev[cartKey] > 0) {
        return prev;
      }
      return { ...prev, [cartKey]: 0 };
    });

    setSelectedSizes((prev) => ({
      ...prev,
      [cartKey]: size,
    }));

    setCartItems((prevItems) => {
      const currentQuantity = prevItems[cartKey] || 0;
      return {
        ...prevItems,
        [cartKey]: currentQuantity + 1,
      };
    });
  };

  const removeFromCart = (itemId, size) => {
    const cartKey = `${itemId}-${size}`;
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[cartKey] > 1) {
        newCart[cartKey] -= 1;
      } else {
        delete newCart[cartKey];
      }
      return newCart;
    });
  };
  const increment = (itemId, size) => {
    const cartKey =` ${itemId}-${size}`;
    setCartItems((prevItems) => {
      const currentQuantity = prevItems[cartKey] || 0;
      return {
        ...prevItems,
        [cartKey]: currentQuantity + 1,
      };
    });
  };

  const decrement = (itemId, size) => {
    const cartKey = `${itemId}-${size}`;
    setCartItems((prevItems) => {
      const currentQuantity = prevItems[cartKey] || 0;
      return {
        ...prevItems,
        [cartKey]: currentQuantity > 1 ? currentQuantity - 1 : 0,
      };
    });
  };

  const deleteFromCart = (itemId, size) => {
    const cartKey =` ${itemId}-${size}`;
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[cartKey];
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const cartKey in cartItems) {
      if (cartItems[cartKey] > 0) {
        const [itemId] = cartKey.split("-");
        let itemInfo = all_product.find(
          (product) => product.id === Number(itemId)
        );
        totalAmount += itemInfo.new_price * cartItems[cartKey];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    const ids = new Set();

    for (const cartKey in cartItems) {
      if (cartItems[cartKey] > 0) {
        const [itemId] = cartKey.split("-");

        ids.add(itemId);
      }
    }

    return ids.size;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    increment,
    decrement,
    selectedSizes,
    orderHistory,
    placeOrder,
  
  
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;

