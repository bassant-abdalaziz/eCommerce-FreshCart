import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Register() {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  // function validation(values)
  // {
  //   let errors ={}
  //   if(!values.name)
  //    errors.name = 'name is required'
  //   else if(!/^[A-Z][a-z]{2,7}$/.test(values.name))
  //    errors.name ='name not match , start with capital , 2-7 char'
  //   if(!values.email)
  //   errors.email = 'email is required'
  //   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
  //   errors.email = 'email not match'

  //   return errors
  // }

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "min length is 3 char")
      .max(7, "max is 7 char")
      .required("name is required"),
    email: Yup.string().email("email not valid").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with an uppercase letter and be between 5 and 10 characters"
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")])
      .required("repassword is required"),
    phone: Yup.string()
      .matches(/^(002)?01[0-25][0-9]{8}$/, "not match")
      .required("phone is required"),
  });

  async function submitForm(values) {
    setLoading(true);
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data.message);
      });

    if (data.message === "success") {
      setError("");
      setLoading(false);
      navigate("/login");
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <div className="container">
      <Helmet>
        <title>Register</title>
      </Helmet>

      <form className="my-5 w-75 mx-auto" onSubmit={formik.handleSubmit}>
        <h3 className="my-3">Register Now:</h3>
        {error ? <p className="alert alert-danger">{error}</p> : ""}
        {/* User Name */}
        <label htmlFor="name">name</label>
        <input
          type="text"
          className="form-control mb-3"
          onBlur={formik.handleBlur}
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        {formik.errors.name && formik.touched.name ? (
          <p className="alert alert-danger">{formik.errors.name}</p>
        ) : (
          ""
        )}

        {/* Email */}
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

        {/* password*/}
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

        {/* Confirm Password*/}
        <label htmlFor="rePassword">rePassword</label>
        <input
          type="password"
          className="form-control mb-3"
          onBlur={formik.handleBlur}
          id="rePassword"
          name="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
        />

        {formik.errors.rePassword && formik.touched.rePassword ? (
          <p className="alert alert-danger">{formik.errors.rePassword}</p>
        ) : (
          ""
        )}

        {/* Phone*/}
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          className="form-control mb-3"
          onBlur={formik.handleBlur}
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />

        {formik.errors.phone && formik.touched.phone ? (
          <p className="alert alert-danger">{formik.errors.phone}</p>
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
      </form>
    </div>
  );
}
