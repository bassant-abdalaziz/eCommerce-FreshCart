import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";

import { UserTokenContext } from "../../Context/UserToken";
import { UserCartContext } from "../../Context/UserCart";
import { UserWishListContext } from "../../Context/WishList";
export default function Navbar() {
  const { isLogin, setIsLogin } = useContext(UserTokenContext);
  const { cartTotalNumbers } = useContext(UserCartContext);
  const { count } = useContext(UserWishListContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("likedProducts");
    setIsLogin(null);
    navigate("/");
    window.location.reload();
  }
  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate("/");
  //   }
  // }, [isLogin]);

  // console.log("NAVBAR RENDERED cart");
  // console.log({ cartTotalNumbers });

  // console.log("NAVBAR RENDERED wish list");
  // console.log({ count });

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm bg-light py-3 z-3 position-fixed top-0 w-100">
      <div className="container-xxl">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: "#0aad0a",
                        color: "white",
                        borderRadius: "5px",
                      }
                    : { backgroundColor: " " }
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="products"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: "#0aad0a",
                        color: "white",
                        borderRadius: "5px",
                      }
                    : { backgroundColor: " " }
                }
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="categories"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: "#0aad0a",
                        color: "white",
                        borderRadius: "5px",
                      }
                    : { backgroundColor: " " }
                }
              >
                Categories
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="brands"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: "#0aad0a",
                        color: "white",
                        borderRadius: "5px",
                      }
                    : { backgroundColor: " " }
                }
              >
                Brands
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {!isLogin ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="register"
                    className="nav-link"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            backgroundColor: "#0aad0a",
                            color: "white",
                            borderRadius: "5px",
                          }
                        : { backgroundColor: " " }
                    }
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="login"
                    className="nav-link"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            backgroundColor: "#0aad0a",
                            color: "white",
                            borderRadius: "5px",
                          }
                        : { backgroundColor: " " }
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="cart"
                    className="nav-link me-3"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            backgroundColor: "#0aad0a",
                            color: "white",
                            borderRadius: "5px",
                          }
                        : { backgroundColor: " " }
                    }
                  >
                    <div className="position-relative">
                      <i className="fa-solid fa-shopping-cart fa-lg"></i>{" "}
                      <span className="cart-num bg-danger">
                        {cartTotalNumbers}
                      </span>
                    </div>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="wishlist"
                    className="nav-link me-3"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            backgroundColor: "#0aad0a",
                            color: "white",
                            borderRadius: "5px",
                          }
                        : { backgroundColor: " " }
                    }
                  >
                    <div className="position-relative">
                      <i className="fa-solid fa-heart fa-lg"></i>{" "}
                      <span className="cart-num bg-danger">{count}</span>
                    </div>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="profile"
                    className="nav-link "
                    style={({ isActive }) =>
                      isActive
                        ? {
                            backgroundColor: "#0aad0a",
                            color: "white",
                            borderRadius: "5px",
                          }
                        : { backgroundColor: " " }
                    }
                  >
                    <i className="fa-solid fa-user fa-lg"></i>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link cursor-pointer"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            backgroundColor: "#0aad0a",
                            color: "white",
                            borderRadius: "5px",
                          }
                        : { backgroundColor: " " }
                    }
                    to="/allorders"
                  >
                    Orders
                  </NavLink>
                </li>

                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={logOut}>
                    SignOut
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
