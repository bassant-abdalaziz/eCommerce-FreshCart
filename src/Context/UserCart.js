import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { UserTokenContext } from "./UserToken";
import toast from "react-hot-toast";
export const UserCartContext = createContext(0);

export default function UserCartContextProvider({ children }) {
  // const { isLogin } = useContext(UserTokenContext);
  const [isLoading, setLoading] = useState(false);
  const [cartTotalNumbers, setCartTotalNumbers] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartDataArr, setCartDataArr] = useState([]);
  let headers = { token: localStorage.getItem("userToken") };

  //Add Product To Cart
  const addCart = async (id) => {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  };

  async function addCartFun(id) {
    let res = await addCart(id);

    if (localStorage.getItem("userToken")) {
      if (res.data.status === "success") {
        getCartInfo();
        toast.success(res.data.message);
      }
    } else {
      toast.error(res.response.data.message);
    }
  }

  ///////////////////////////////////////////////

  //Get Product Cart
  const getCart = async () => {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => res)
      .catch((err) => err);
  };

  // Show Products in Cart
  async function getCartInfo() {
    setLoading(true);
    const res = await getCart();
    if (res.data?.status === "success") {
      setCartDataArr(res.data?.data.products);
      setTotalPrice(res.data?.data.totalCartPrice);
      setCartTotalNumbers(res.data?.numOfCartItems);
    }
    setLoading(false);
  }

  useEffect(() => {
    getCartInfo();
  }, []);

  //Delete From Cart
  const deleteCart = async (productId) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  };

  //Clear Cart
  const clearCart = async () => {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  };

  //Update Cart
  const updateCart = async (id, count) => {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  };

  //Online Payment
  const onlinePayment = (id, shippingAddress) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,
        { shippingAddress },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  };

  return (
    <UserCartContext.Provider
      value={{
        addCartFun,
        deleteCart,
        clearCart,
        updateCart,
        cartTotalNumbers,
        setCartTotalNumbers,
        totalPrice,
        cartDataArr,
        setCartDataArr,
        getCartInfo,
        onlinePayment,
        getCart,
        isLoading,
      }}
    >
      {children}
    </UserCartContext.Provider>
  );
}
