// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import ShopContextProvider from './Context/ShopContext'
// import { ShopContextProvider } from "react-redux";
// import store from "./redux/store";


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <ShopContextProvider  store={store}>
//      <App />
//   </ShopContextProvider>
   
 
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./radux/store";
import ShopContextProvider from "./Context/ShopContext"; // Import your ShopContextProvider correctly

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </Provider>
);
