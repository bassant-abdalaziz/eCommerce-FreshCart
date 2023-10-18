import axios from "axios";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function ForgottenPassword() {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  let validationSchema = Yup.object({
    email: Yup.string().email("email not valid").required("email is required"),
  });

  async function submitForm(values) {
    setLoading(true);
    const { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .catch((err) => {
        setLoading(false);
        toast.error(err.response?.data.message);
      });

    if (data.statusMsg === "success") {
      toast.success(data.message);
      setLoading(false);
      navigate("/verify-code");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <div className="container">
      <Helmet>
        <title>Forget Password </title>
      </Helmet>
      <form className="my-5 w-75 mx-auto" onSubmit={formik.handleSubmit}>
        <h3 className="my-3">Forget Password:</h3>

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
            Send Code
          </button>
        )}
      </form>
    </div>
  );
}
