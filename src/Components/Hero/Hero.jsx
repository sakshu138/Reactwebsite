import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imageList from "../Assets/slider";



function Hero() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    arrows: false,
  };

  return (
    <div
      style={{background: "linear-gradient(180deg, #fde1ff 30%, #e1ffea22 60%)",
        backgroundAttachment:"fixed"
      }}
    >
      <Slider {...settings} style={{ width: "100%",height:'70vh' }}>
        {imageList.map((image) => (
          <div key={image.id}    >
            <div style={{
            display: "flex",
            justifyContent: "center", 
            alignItems: "center",
            width: "100%",
          }}>
            <img
              src={image.image}
              alt={`Slide ${image.id}`}
              style={{
                width: "25%",
                height: "auto",
                marginRight: "25%",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "40px" }}>
              <h1 style={{ fontSize: "50px", fontWeight: "600" }}>{image.title}</h1>
              <p style={{ fontSize: "20px", fontWeight: "200" }}>{image.description}</p>
            </div>
          </div>
            </div>
        ))}
      </Slider>


      <button
        style={{
          padding: "15px 30px",
          backgroundColor: "#ff4081",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "20px",
          position: "absolute",
          right: "19%",
          bottom: "30%",
          marginTop:"200px",
          marginRight:"5%"
        }}
      >
        Click Me
      </button>
    </div>
  );
}

export default Hero;
