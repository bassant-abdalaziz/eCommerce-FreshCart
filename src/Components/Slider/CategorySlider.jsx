import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import axios from "axios";
import { useQuery } from "react-query";

import { useMediaQuery } from "react-responsive";

export default function CategorySlider() {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const isTablet = useMediaQuery({ maxWidth: 900 });

  let slidesPerView;

  if (isMobile) {
    slidesPerView = 2;
  } else if (isTablet) {
    slidesPerView = 3;
  } else {
    slidesPerView = 5;
  }

  function getData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data } = useQuery("categories", getData);

  return (
    <div className="container container-slider">
      <h2 className="text-main my-3">Shop Popular Categories</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={slidesPerView}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {data?.data.data.map((category) => {
          return (
            <SwiperSlide key={category._id}>
              <LazyLoadImage
                src={category.image}
                className="w-100 rounded-4 object-fit-cover"
                height={250}
                alt="category"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
