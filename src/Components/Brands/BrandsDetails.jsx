import React, { useContext } from "react";
import Loading from "../Loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { ProductContext } from "../../Context/Product";
import { UserCartContext } from "../../Context/UserCart";
import { UserWishListContext } from "../../Context/WishList";

export default function BrandsDetails() {
  const { like, setLike, addToWishListFun } = useContext(UserWishListContext);
  const { addCartFun } = useContext(UserCartContext);
  const { productBrand } = useContext(ProductContext);
  console.log(productBrand);
  const { isLoading, data } = useApi("products", "products");

  const productsArr = data?.data.data.filter(
    (product) => product.brand.name === productBrand
  );

  return (
    <div className="container my-5 ">
      <Helmet>
        <title>Product {productBrand}</title>
      </Helmet>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="row ">
          {productsArr.length ? (
            productsArr.map((product) => (
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
            ))
          ) : (
            <h4 className="text-main">No Products Exist for this Brand</h4>
          )}
        </div>
      )}
    </div>
  );
}
