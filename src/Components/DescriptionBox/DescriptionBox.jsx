import React from "react";
import "./Description.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="description-description">
        <p>
          An online platform designed for seamless digital shopping, offering a
          diverse range of products across various categories. The website
          provides users with an intuitive interface, secure transactions, and
          convenient browsing options. Customers can explore detailed product
          descriptions, view images, and make informed purchasing decisions. A
          streamlined checkout process ensures a smooth experience, while
          multiple payment methods enhance flexibility. With responsive design,
          the platform is accessible across devices, ensuring a user-friendly
          experience. Additional features such as personalized recommendations,
          order tracking, and customer support enhance the overall shopping
          journey.
        </p>
        <p>
          An online platform designed for seamless digital shopping, offering a
          diverse range of products across various categories. The website
          provides users with an intuitive interface, secure transactions, and
          convenient browsing options. 
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
