import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { UserCartContext } from "../../Context/UserCart";

import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import cartImg from "../../assets/cart.png";
import useJWT from "../../hooks/jwt";

export default function Cart() {
  const decodedToken = useJWT();

  const {
    isLoading,
    cartDataArr,
    setCartDataArr,
    deleteCart,
    updateCart,
    clearCart,
    totalPrice,
    setCartTotalNumbers,
    getCartInfo,
  } = useContext(UserCartContext);

  //delete product from cart
  async function deleteCartFun(id) {
    let res = await deleteCart(id);
    if (res.data?.status === "success") {
      getCartInfo();
      toast.success("Product is deleted successfully");
    }
  }

  //update products
  async function updateCartFun(id, count) {
    if (count - 1 < 0) {
      let deleteRes = await deleteCart(id);
      if (deleteRes.data?.status === "success") {
        toast.success("Product is deleted successfully");
        getCartInfo();
      }
    } else {
      let updateRes = await updateCart(id, count);
      console.log(count);
      if (updateRes.data?.status === "success") {
        getCartInfo();
      }
    }
  }

  //clear cart
  async function clearCartFun() {
    let res = await clearCart();
    console.log(res);
    if (res.data?.message === "success") {
      toast.success("All products are deleted successfully");
      setCartDataArr([]);
      setCartTotalNumbers(0);
    }
  }

  return (
    <div className="container">
      <Helmet>
        <title>Cart Shopping</title>
      </Helmet>

      <h2 className="fw-bold text-center pt-5">
        Welcome {decodedToken.name} to your cart{"  "}
        <i className="fa-solid fa-shopping-cart text-main"></i>
      </h2>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="row align-items-center my-5 bg-main-light">
            <div className="col-12 col-md-6">
              <img
                src={cartImg}
                alt="cart-img"
                className="w-100"
                height={400}
              />
            </div>

            <div className="col-12 col-md-4 ">
              {cartDataArr?.length === 0 ? (
                <h3 className=""> your cart is empty</h3>
              ) : (
                <>
                  <h4 className="text-center fw-bold text-main">
                    Total Cart Price is : {totalPrice} EGP
                  </h4>
                  <div className=" p-3">
                    <button
                      className="btn btn-danger form-control"
                      onClick={clearCartFun}
                    >
                      Clear All
                    </button>

                    <Link to="/checkout">
                      <button className="btn form-btn form-control my-2">
                        CheckOut{" "}
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="p-3 my-3 ">
            {cartDataArr?.map((prod) => {
              return (
                <div
                  className="row py-3 align-items-center border-bottom g-4"
                  key={prod.product._id}
                >
                  <div className="col-md-9">
                    <div className="row align-items-center">
                      <div className="col-2">
                        <img
                          src={prod.product.imageCover}
                          alt="cart-product"
                          className="w-100 object-fit-cover"
                        />
                      </div>
                      <div className="col-10">
                        <p className="fw-bold">
                          {prod.product.title.split(" ").slice(0, 2).join(" ")}
                        </p>
                        <p className="text-main fw-bold">
                          Price : {prod.price} EGP
                        </p>
                        <button
                          className="btn btn-outline-danger "
                          onClick={() => deleteCartFun(prod.product._id)}
                        >
                          <i className="fa-solid fa-trash fa-lg"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex  justify-content-end align-items-center">
                    <button
                      className="btn btn-delete"
                      onClick={() =>
                        updateCartFun(prod.product._id, prod.count + 1)
                      }
                    >
                      +
                    </button>
                    <span className="mx-2">{prod.count}</span>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() =>
                        updateCartFun(prod.product._id, prod.count - 1)
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
