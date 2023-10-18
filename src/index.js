import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserTokenContextProvider from "../src/Context/UserToken";
import UserCartContextProvider from "./Context/UserCart";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductContextProvider from "./Context/Product";
import UserWishListContextProvider from "./Context/WishList";

// Create a client
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserTokenContextProvider>
    <ProductContextProvider>
      <UserWishListContextProvider>
        <UserCartContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </UserCartContextProvider>
      </UserWishListContextProvider>
    </ProductContextProvider>
  </UserTokenContextProvider>
);

reportWebVitals();
