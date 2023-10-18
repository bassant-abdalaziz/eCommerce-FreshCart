import React from "react";
import jwtDecode from "jwt-decode";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../Loading";

export default function AllOrders() {
  const encodedToken = jwtDecode(localStorage.getItem("userToken"));
  const userId = encodedToken.id;

  function getUserAllOrders() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }

  const { isLoading, data } = useQuery("allOrders", getUserAllOrders);

  return (
    <div className="container">
      <Helmet>
        <title>All Orders</title>
      </Helmet>

      <h2 className=" fw-bold text-center pt-5">
        Welcome {encodedToken.name} to your all orders{" "}
        <i className="fa-solid fa-heart text-danger"></i>
      </h2>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="p-3 my-3 ">
            {data?.data.map((order) => {
              return (
                <div key={order._id}>
                  {order.cartItems.map((item) => {
                    return (
                      <div key={item._id}>
                        <div className=" py-3 d-flex align-items-center justify-content-between  border-bottom ">
                          <div className="p-0 col-2 d-flex align-items-center">
                            <img
                              src={item.product.imageCover}
                              alt="order"
                              className="w-50 object-fit-cover"
                            />
                            <p className="ms-3">
                              {item.product.title
                                .split(" ")
                                .slice(0, 2)
                                .join(" ")}
                            </p>
                          </div>
                          <div>
                            <p>
                              Price :{" "}
                              <span className="text-main">
                                {item.price} EGP
                              </span>
                            </p>
                            <p>Quantity : {item.count}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="d-flex align-items-center justify-content-around bg-main-light p-5 my-3">
                    <p className="fw-bold">
                      Total Price :{" "}
                      <span className="text-main">
                        {order.totalOrderPrice} EGP
                      </span>
                    </p>
                    <p className="fw-bold">
                      Payment :{" "}
                      <span className="text-main">
                        {order.paymentMethodType}
                      </span>{" "}
                    </p>
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
