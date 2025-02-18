import React, { useState, useEffect } from "react";
import "./CSS/OrderTimeline.css";

const OrderTimeline = () => {
 
  const [steps, setSteps] = useState([
    { id: 1, title: "Order Placed", description: "We have received your order", time: "10:04 pm", completed: false },
    { id: 2, title: "Payment Confirmed", description: "Awaiting confirmation...", time: "10:08 pm", completed: false },
    { id: 3, title: "Order Processed", description: "We are preparing your order", time: "11:00 pm", completed: false },
    { id: 4, title: "Ready to Pickup", description: "Order #25v4440k45 from Myntra", time: "11:10 pm", completed: false },
  ]);

  useEffect(() => {
    let timer;
    steps.forEach((step, index) => {
      timer = setTimeout(() => {
        setSteps((prevSteps) =>
          prevSteps.map((s, i) =>
            i === index ? { ...s, completed: true } : s
          )
        );
      }, (index + 1) * 1000); 
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="frist">
      <div>
      <div className="timeline">
        <h1>Tracking Order</h1>
        {steps.map((step, index) => (
          <div key={step.id} className={`timeline-item ${step.completed ? "completed" : "current"}`}>
            <div className="timeline-icon">{step.completed ? "✔" : step.id}</div>
            <div className="timeline-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <div className="timeline-time">{step.time}</div>
          </div>
        ))}</div>
        <button className="go-to-shop" onClick={() => window.location.href='/'}>Go to Shop</button>
      </div>
    </div>
  );
};

export default OrderTimeline;