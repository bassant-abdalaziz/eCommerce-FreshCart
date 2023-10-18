import React, { useContext } from "react";
import Loading from "../Loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { ProductContext } from "../../Context/Product";

export default function Brands() {
  const { setProductBrand } = useContext(ProductContext);
  const { isLoading, data } = useApi("brands", "brands");

  return (
    <div className="container my-5">
      <Helmet>
        <title>Brands</title>
      </Helmet>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <h2 className="text-main my-3">Our Brands</h2>
          <div className="row">
            {data?.data.data.map((brand) => (
              <div
                onClick={() => setProductBrand(brand.name)}
                key={brand._id}
                className="col-12 col-md-6 col-lg-3 cursor-pointer"
              >
                <Link to="/brandDetails">
                  <div className="product p-3 mt-4">
                    <img
                      src={brand.image}
                      className="w-100 "
                      height={200}
                      alt="brand"
                    />
                    <p className="text-main text-center pt-3 fw-bold">
                      {brand.name}
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
