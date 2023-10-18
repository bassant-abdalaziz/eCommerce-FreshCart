import { createContext, useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
export const UserWishListContext = createContext();

export default function UserWishListContextProvider({ children }) {
  const [isLoading, setLoading] = useState(false);
  let [like, setLike] = useState([]);
  const [count, setCount] = useState(0);
  const [wishListDataArr, setWishListDataArr] = useState([]);
  let headers = { token: localStorage.getItem("userToken") };

  //Get Product WishList
  const getWishlist = async () => {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((res) => res)
      .catch((err) => err);
  };

  // Show Products in wishList
  async function getWishListInfo() {
    setLoading(true);
    const res = await getWishlist();
    if (res.data?.status === "success") {
      setWishListDataArr(res.data?.data);
      setLike(res.data?.data.map((item) => item.id));
      setCount(res.data?.count);
    }
    setLoading(false);
  }

  useEffect(() => {
    getWishListInfo();
  }, []);

  //Add To WishList
  const addToWishList = (id) => {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  };
  //add to wishList
  async function addToWishListFun(id) {
    let res = await addToWishList(id);

    if (localStorage.getItem("userToken")) {
      if (res.data?.status === "success") {
        getWishListInfo();
        toast.success(res.data?.message);
      }
    } else {
      toast.error(res.response?.data.message);
    }
  }

  // Load liked products from localStorage when the component mounts
  useEffect(() => {
    const likedProducts = JSON.parse(localStorage.getItem("likedProducts"));
    if (likedProducts) {
      setLike(likedProducts);
    }
  }, []);

  // Save liked products to localStorage whenever 'like' state changes
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      localStorage.setItem("likedProducts", JSON.stringify(like));
    }
  }, [like]);

  //Delete From WishList
  const deleteFromWishList = (id) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  };

  return (
    <UserWishListContext.Provider
      value={{
        addToWishListFun,
        deleteFromWishList,
        like,
        setLike,
        count,
        getWishListInfo,
        wishListDataArr,
        isLoading,
      }}
    >
      {children}
    </UserWishListContext.Provider>
  );
}
