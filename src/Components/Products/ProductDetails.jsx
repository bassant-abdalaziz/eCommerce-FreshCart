import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { Helmet } from "react-helmet";
import { UserCartContext } from "../../Context/UserCart";
import Slider from "react-slick";
import useApiDetails from "../../hooks/useApiDetails";
import { UserWishListContext } from "../../Context/WishList";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading } = useApiDetails("productsDetails", "products", id);
  const { addCartFun } = useContext(UserCartContext);
  const { like, setLike, addToWishListFun } = useContext(UserWishListContext);

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
    <div className="container container-slider">
      <Helmet>
        <title>{data?.data.data.title}</title>
      </Helmet>

      <div className="row align-items-center my-5 g-4">
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <>
            <div className=" col-md-3">
              <Slider {...settings}>
                {data?.data.data.images.map((image, index) => {
                  return (
                    <img
                      key={index}
                      src={image}
                      alt="product-details"
                      className="w-100"
                    />
                  );
                })}
              </Slider>
            </div>
            <div className="col-md-9 ">
              <p>{data?.data.data.title}</p>
              <p>{data?.data.data.description}</p>
              <p>{data?.data.data.category.name}</p>
              <div className="d-flex justify-content-between">
                <span className="fw-bolder">{data?.data.data.price} EGP</span>
                <span className="fw-bolder">
                  <li className="fa-solid fa-star rating-color"></li>{" "}
                  {data?.data.data.ratingsAverage}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-5">
                <button
                  className="btn form-btn "
                  onClick={() => addCartFun(data?.data.data._id)}
                >
                  Add To Cart
                </button>

                {like?.includes(data?.data.data._id) ? (
                  localStorage.getItem("userToken") ? (
                    <i className="fa-solid fa-heart fa-lg text-danger pb-3"></i>
                  ) : (
                    <i className="fa-regular fa-heart fa-lg text-danger pb-3"></i>
                  )
                ) : (
                  <i
                    className="fa-regular fa-heart fa-lg text-danger pb-3"
                    onClick={() => {
                      setLike([...like, data?.data.data._id]);
                      addToWishListFun(data?.data.data._id);
                    }}
                  ></i>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
