import React, { useContext, useState } from "react";
import Loading from "../Loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { UserCartContext } from "../../Context/UserCart";
import { UserWishListContext } from "../../Context/WishList";

export default function Products() {
  const { addCartFun } = useContext(UserCartContext);
  const { like, setLike, addToWishListFun } = useContext(UserWishListContext);
  const [searchValue, setSearchValue] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("All Prices");
  const { isLoading, data } = useApi("products", "products");

  //Filter products
  const filteredProducts = data?.data.data
    .filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .filter(
      (product) =>
        selectedPrice === "All Prices" ||
        product.price === parseFloat(selectedPrice)
    );

  //Filter by search
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  //Filter by price
  const uniquePrice = Array.from(
    new Set(
      data?.data.data
        .sort((a, b) => a.price - b.price)
        .map((product) => product.price)
    )
  );

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  return (
    <div className="container my-5 ">
      <Helmet>
        <title>Products</title>
      </Helmet>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <h2 className="text-main my-3">All Products</h2>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <input
                type="text"
                className="form-control w-100"
                placeholder="search ..."
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
            <div className="col-12 col-md-6">
              <select
                className="form-control w-100"
                value={selectedPrice}
                onChange={handlePriceChange}
              >
                <option value="All Prices">All Prices</option>
                {uniquePrice.map((price) => {
                  return (
                    <option key={price} value={price}>
                      {price} EGP
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row ">
            {filteredProducts
              .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
              .map((product) => (
                <div
                  key={product._id}
                  className="col-12 col-md-6 col-lg-3 col-xl-2"
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
                      <img
                        src={product.imageCover}
                        className="w-100"
                        alt="product"
                      />
                      <p className="text-main">{product.category.name}</p>
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
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
