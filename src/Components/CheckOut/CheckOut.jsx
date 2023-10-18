import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import React, { useState, useContext } from "react";
import * as Yup from "yup";

import paymentImg from "../../assets/payment.jpg";
import { UserCartContext } from "../../Context/UserCart";
import { RotatingLines } from "react-loader-spinner";
export default function CheckOut() {
  const [isLoading, setLoading] = useState(false);
  const { getCart, onlinePayment } = useContext(UserCartContext);

  let validationSchema = Yup.object({
    details: Yup.string().required("address details is required"),
    phone: Yup.string()
      .matches(/^(002)?01[0-25][0-9]{8}$/, "not match")
      .required("phone is required"),
    city: Yup.string().required("city / area is required"),
  });

  async function onlinePaymentFun(values) {
    setLoading(true);
    const { data } = await getCart();
    // console.log(data.data._id);
    let res = await onlinePayment(data?.data._id, values);
    // console.log(res.data.session.url);
    window.location.href = res.data.session.url;
    setLoading(false);
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: onlinePaymentFun,
  });

  return (
    <div className="container">
      <Helmet>
        <title>Payment</title>
      </Helmet>

      <div className="row align-items-center w-75 mx-auto py-5 g-5">
        <div className="col-12 col-md-6">
          <img src={paymentImg} alt="payment" className="w-100" />
        </div>
        <div className="col-12 col-md-6">
          <form onSubmit={formik.handleSubmit}>
            <label className="mb-2" htmlFor="details">
              Address Details
            </label>
            <input
              placeholder="Enter Address Details"
              type="text"
              className="form-control mb-4"
              onBlur={formik.handleBlur}
              id="details"
              name="details"
              onChange={formik.handleChange}
              value={formik.values.details}
            />

            {formik.errors.details && formik.touched.details ? (
              <p className="alert alert-danger">{formik.errors.details}</p>
            ) : (
              ""
            )}

            <label className="mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              placeholder="Enter Your phone"
              type="tel"
              className="form-control mb-4"
              onBlur={formik.handleBlur}
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />

            {formik.errors.phone && formik.touched.phone ? (
              <p className="alert alert-danger">{formik.errors.phone}</p>
            ) : (
              ""
            )}

            <label className="mb-2" htmlFor="city">
              City / Area
            </label>
            <input
              placeholder="City / Area"
              type="text"
              className="form-control mb-4"
              onBlur={formik.handleBlur}
              id="city"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
            />

            {formik.errors.city && formik.touched.city ? (
              <p className="alert alert-danger">{formik.errors.city}</p>
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
                Credit Payment
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
