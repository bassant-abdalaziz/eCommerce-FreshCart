import axios from "axios";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import React, { useState, useContext, useEffect } from "react";
import * as Yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { UserTokenContext } from "../../Context/UserToken";

export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { isLogin, setIsLogin } = useContext(UserTokenContext);

  const navigate = useNavigate();

  let validationSchema = Yup.object({
    email: Yup.string().email("email not valid").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with an uppercase letter and be between 5 and 10 characters"
      )
      .required("password is required"),
  });

  async function submitForm(values) {
    setLoading(true);
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data.message);
      });

    if (data.message === "success") {
      setError("");
      setLoading(false);
      localStorage.setItem("userToken", data.token);
      setIsLogin(data.token);
    }
  }

  useEffect(() => {
    if (isLogin) {
      navigate("/");
      window.location.reload();
    }
  }, [isLogin]);

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <div className="container">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form className="my-5 w-75 mx-auto" onSubmit={formik.handleSubmit}>
        <h3 className="my-3">Login Now:</h3>
        {error ? <p className="alert alert-danger">{error}</p> : ""}

        <label htmlFor="email">email</label>
        <input
          type="email"
          className="form-control mb-3"
          onBlur={formik.handleBlur}
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : (
          ""
        )}

        <label htmlFor="password">password</label>
        <input
          type="password"
          className="form-control mb-3"
          onBlur={formik.handleBlur}
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        {formik.errors.password && formik.touched.password ? (
          <p className="alert alert-danger">{formik.errors.password}</p>
        ) : (
          ""
        )}

        {isLoading ? (
          <button className="btn form-btn ms-auto d-block">
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="btn form-btn ms-auto d-block"
          >
            Register
          </button>
        )}
        <Link className="text-main fw-bold" to="/forget-password">
          Forgotten password?
        </Link>
      </form>
    </div>
  );
}
