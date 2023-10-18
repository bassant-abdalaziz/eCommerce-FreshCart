import React from "react";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import slide4 from "../../assets/grocery-banner-2.jpeg";

let arrImages = [slide1, slide2, slide3, slide4];

export default function MainSlider() {
  var settings = {
    lazyLoad: true,
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="container my-5 container-slider">
      <div className="row gx-0">
        <div className="col-12">
          <Slider {...settings}>
            {arrImages.map((img, index) => {
              return (
                <LazyLoadImage
                  className="rounded-3"
                  key={index}
                  src={img}
                  height={400}
                  alt="slider-img"
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
