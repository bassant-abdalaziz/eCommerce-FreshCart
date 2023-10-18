import React from "react";

export default function Loading() {
  return (
    <div
      className="position-fixed top-0 start-0  bg-opacity-50 w-100 h-100 z-3 bg-black 
    d-flex justify-content-center align-items-center"
    >
      <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
    </div>
  );
}
