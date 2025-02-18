import React, { useEffect, useState } from "react";
import "./CSS/History.css";

const History = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

    if (Array.isArray(history)) {
      setPurchaseHistory(history);
    } else {
      console.error("Invalid purchase history data:", history);
      setPurchaseHistory([]); 
    }
  }, []);

  
  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all purchase history?")) {
      localStorage.removeItem("purchaseHistory"); 
      setPurchaseHistory([]); 
    }
  };

  return (
    <div className="history">
      <h1>Purchase History</h1>

      
      {purchaseHistory.length > 0 && (
        <button onClick={clearHistory} className="clear-history-btn">
          Clear All Items
        </button>
      )}

      {purchaseHistory.length === 0 ? (
        <p>No past purchases found.</p>
      ) : (
        purchaseHistory.map((order, index) => (
          <div key={index} className="history-order">
            <h3>Order Date: {new Date(order.date).toLocaleString()}</h3>
            <p>Total: ${order.total}</p>
            <p>Status: <strong style={{ color: order.status === "Completed" ? "green" : "orange" }}>{order.status}</strong></p>

            {Array.isArray(order.items) ? (
              <ul>
                {order.items.map((product, idx) => (
                  <li key={idx} className="history-item">
                    <img src={product.image} alt={product.name} className="history-product-img" />
                    <div>
                      <p><strong>{product.name}</strong> (Size: {product.size})</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: ${product.price} x {product.quantity} = ${product.total}</p>
                      <p>Status: <strong style={{ color: product.status === "Completed" ? "green" : "orange" }}>{product.status}</strong></p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "red" }}>Error: Order items data is incorrect.</p>
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default History;