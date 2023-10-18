import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Loading from "./Components/Loading";

//protected route
import ProtectedRoute from "./Components/ProtectedRoute";

//component lazy loading
const Products = React.lazy(() => import("./Components/Products/Products"));
const ProductDetails = React.lazy(() =>
  import("./Components/Products/ProductDetails")
);
const Categories = React.lazy(() =>
  import("./Components/Ctegories/Categories")
);
const CategoriesDetails = React.lazy(() =>
  import("./Components/Ctegories/CategoriesDetails")
);
const Brands = React.lazy(() => import("./Components/Brands/Brands"));
const BrandsDetails = React.lazy(() =>
  import("./Components/Brands/BrandsDetails")
);
const Cart = React.lazy(() => import("./Components/Cart/Cart"));
const WishList = React.lazy(() => import("./Components/WishList/WishList"));
const UserProfile = React.lazy(() =>
  import("./Components/UserProfile/UserProfile")
);
const Login = React.lazy(() => import("./Components/Login/Login"));
const ForgetPassword = React.lazy(() =>
  import("./Components/ForgetPassword/ForgottenPassword")
);
const VerifyCode = React.lazy(() =>
  import("./Components/ForgetPassword/VerifyCode")
);

const ResetNewPassword = React.lazy(() =>
  import("./Components/ForgetPassword/ResetNewPassword")
);
const Register = React.lazy(() => import("./Components/Register/Register"));
const CheckOut = React.lazy(() => import("./Components/CheckOut/CheckOut"));
const AllOrders = React.lazy(() => import("./Components/AllOrders/AllOrders"));
const NotFound = React.lazy(() => import("./Components/NotFound"));

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Home></Home> },
        {
          path: "products",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <Products></Products>
            </Suspense>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <ProductDetails></ProductDetails>
            </Suspense>
          ),
        },
        {
          path: "categories",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <Categories></Categories>
            </Suspense>
          ),
        },
        {
          path: "categoriesDetails",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <CategoriesDetails></CategoriesDetails>
            </Suspense>
          ),
        },
        {
          path: "brands",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <Brands></Brands>
            </Suspense>
          ),
        },
        {
          path: "brandDetails",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <BrandsDetails></BrandsDetails>
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <ProtectedRoute>
                <Cart></Cart>
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "wishlist",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <ProtectedRoute>
                <WishList></WishList>
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "profile",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <ProtectedRoute>
                <UserProfile></UserProfile>
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <Login></Login>
            </Suspense>
          ),
        },
        {
          path: "forget-password",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <ForgetPassword></ForgetPassword>
            </Suspense>
          ),
        },
        {
          path: "verify-code",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <VerifyCode></VerifyCode>
            </Suspense>
          ),
        },
        {
          path: "reset-password",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <ResetNewPassword></ResetNewPassword>
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <Register></Register>
            </Suspense>
          ),
        },

        {
          path: "checkout",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <ProtectedRoute>
                <CheckOut></CheckOut>
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "allorders",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <ProtectedRoute>
                <AllOrders></AllOrders>
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <NotFound></NotFound>
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster></Toaster>
    </>
  );
}
