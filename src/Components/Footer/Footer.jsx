import React from "react";

export default function Footer() {
  return (
    <footer className="py-5 bg-main-light mt-5">
      <div className="container">
        <h2>Get the freshCart App</h2>
        <p>we share this link Lorem ipsum dolor sit.</p>
        <div className="row g-3">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              placeholder="share Link"
            />
          </div>
          <div className="col-md-3">
            <button className="btn form-btn form-control">shareLink</button>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center mt-5">
          <i className="fa-brands fa-facebook mx-2 fa-lg"></i>
          <i className="fa-brands fa-youtube mx-2 fa-lg"></i>
          <i className="fa-brands fa-instagram mx-2 fa-lg"></i>
          <i className="fa-brands fa-google mx-2 fa-lg"></i>
        </div>
      </div>
    </footer>
  );
}
