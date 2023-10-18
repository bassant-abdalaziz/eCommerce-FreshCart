import { createContext, useState } from "react";

export const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
  const [productCategory, setProductCategory] = useState("");
  const [productBrand, setProductBrand] = useState("");

  return (
    <ProductContext.Provider
      value={{
        productCategory,
        setProductCategory,
        productBrand,
        setProductBrand,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
