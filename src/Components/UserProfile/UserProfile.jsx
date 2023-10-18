import React from "react";
import { Helmet } from "react-helmet";
import useJWT from "../../hooks/jwt";

export default function UserProfile() {
  const decodedToken = useJWT();

  return (
    <div className="container">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="position-relative top-0 w-100 h-100 d-flex justify-content-center align-items-center">
        <h2 className=" fw-bold text-center">
          Hello {decodedToken.name} in your profile{" "}
          <i className="fa-solid fa-heart text-danger"></i>
        </h2>
      </div>
    </div>
  );
}
