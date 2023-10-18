import axios from "axios";
import AOS from "aos";

import Loading from "../Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserCartContext } from "../../Context/UserCart";
import { UserWishListContext } from "../../Context/WishList";

export default function FeaturedProducts() {
  const { addCartFun } = useContext(UserCartContext);
  const { like, setLike, addToWishListFun } = useContext(UserWishListContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  function getData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products", {
      params: {
        page: currentPage,
        limit: itemsPerPage,
      },
    });
  }

  const { isLoading, data } = useQuery(["products", currentPage], getData);

  const totalPages = Math.ceil(data?.data.results / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="container">
      <h2 className="text-main my-3">Featured Products</h2>
      <div className="row">
        {isLoading ? (
          <Loading></Loading>
        ) : (
          data.data.data.map((product, index) => (
            <div
              key={product._id}
              className="col-12 col-md-6 col-lg-3 "
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 100}
            >
              <div className="product p-3 mt-4 cursor-pointer">
                {like?.includes(product._id) ? (
                  localStorage.getItem("userToken") ? (
                    <i className="fa-solid fa-heart fa-lg text-danger pb-3"></i>
                  ) : (
                    <i className="fa-regular fa-heart fa-lg text-danger pb-3"></i>
                  )
                ) : (
                  <i
                    className="fa-regular fa-heart fa-lg text-danger pb-3"
                    onClick={() => {
                      setLike([...like, product._id]);
                      addToWishListFun(product._id);
                    }}
                  ></i>
                )}
                <Link to={`/productdetails/${product._id}`}>
                  <LazyLoadImage
                    src={product.imageCover}
                    className="w-100 h-100"
                    alt="product"
                  />
                  <p className="text-main ">{product.category.name}</p>
                  <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                  <div className="product-box d-flex justify-content-between">
                    <span>{product.price} EGP</span>
                    <span>
                      <li className="fa-solid fa-star rating-color"></li>{" "}
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  className="btn form-btn mt-3 form-control"
                  onClick={() => addCartFun(product._id)}
                >
                  <i className="fa-solid fa-shopping-cart"></i> Add
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination ">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
