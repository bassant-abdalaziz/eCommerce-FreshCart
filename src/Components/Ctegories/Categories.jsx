import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { Helmet } from "react-helmet";
import useApi from "../../hooks/useApi";
import { ProductContext } from "../../Context/Product";

export default function Products() {
  const { setProductCategory } = useContext(ProductContext);
  const { isLoading, data } = useApi("categories", "categories");

  return (
    <div className="container my-5">
      <Helmet>
        <title>Categories</title>
      </Helmet>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <h2 className="text-main my-3">Our Categories</h2>
          <div className="row">
            {data?.data.data.map((category) => (
              <div
                onClick={() => setProductCategory(category.name)}
                key={category._id}
                className="col-12 col-md-6 col-lg-3 cursor-pointer"
              >
                <Link to="/categoriesDetails">
                  <div className="product p-3 mt-4" style={{ height: "380px" }}>
                    <img
                      src={category.image}
                      className="w-100 "
                      height={300}
                      alt="category"
                    />
                    <p className="text-main text-center pt-3 fw-bold">
                      {category.name}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
