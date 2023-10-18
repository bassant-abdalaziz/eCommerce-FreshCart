import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";

import { toast } from "react-hot-toast";
import Loading from "../Loading";
import { UserWishListContext } from "../../Context/WishList";
import { UserCartContext } from "../../Context/UserCart";
import useJWT from "../../hooks/jwt";

export default function WishList() {
  const { addCartFun } = useContext(UserCartContext);
  const decodedToken = useJWT();

  const {
    isLoading,
    wishListDataArr,
    deleteFromWishList,
    getWishListInfo,
    like,
    setLike,
  } = useContext(UserWishListContext);

  //delete from wishList
  async function deleteFromWishListFun(id) {
    let res = await deleteFromWishList(id);
    if ((res.data.status = "success")) {
      toast.success(res.data.message);
      setLike(like.filter((item) => item !== id));
      getWishListInfo();
    }
  }

  return (
    <div className="container">
      <Helmet>
        <title>WishList</title>
      </Helmet>

      <h2 className="fw-bold text-center pt-5">
        Welcome {decodedToken.name} to your wishlist{"  "}
        <i className="fa-solid fa-heart text-danger"></i>
      </h2>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="py-5">
            {wishListDataArr?.length === 0 ? (
              <h3 className="text-main text-center">
                {" "}
                your wishlist is empty{" "}
                <i className="fa-solid fa-heart-broken fa-lg text-danger"></i>
              </h3>
            ) : (
              ""
            )}
          </div>

          <div className="p-3 my-3 ">
            {wishListDataArr?.map((prod) => {
              return (
                <div
                  className="row py-3 align-items-center border-bottom g-4"
                  key={prod.id}
                >
                  <div className="col-md-9">
                    <div className="row align-items-center">
                      <div className="col-2">
                        <img
                          src={prod.imageCover}
                          alt="cart-product"
                          className="w-100 object-fit-cover"
                        />
                      </div>
                      <div className="col-10">
                        <p className="fw-bold">
                          {prod.title.split(" ").slice(0, 2).join(" ")}
                        </p>
                        <p className="text-main fw-bold">
                          Price : {prod.price} EGP
                        </p>
                        <button
                          className="btn btn-outline-danger "
                          onClick={() => deleteFromWishListFun(prod.id)}
                        >
                          <i className="fa-solid fa-trash fa-lg"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex  justify-content-end align-items-center">
                    <button
                      className="btn form-btn"
                      onClick={() => addCartFun(prod.id)}
                    >
                      Add To Cart
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
