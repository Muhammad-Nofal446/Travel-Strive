import React, { useState, useEffect, useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { DateRange } from "react-date-range";
import { AuthContext } from "../../context/AuthContext";
import "react-date-range/dist/styles.css"; // Import the styles
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ToastEmitter from "../../components/notification/Notification";
// import { useLocation } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";

const AddTaxi = ({ taxiData }) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const handleBooking = () => {
    console.log("Booking successful");
  };
  return (
    <Formik
      initialValues={{
        carModel: "",
        price: 0,
        maxPeople: 0,
        licenseNum: "",
        imageUrl: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        const data = {
          carModel: values.carModel,
          price: values.price,
          maxPeople: values.maxPeople,
          licenseNum: values.licenseNum,
          imageUrl: values.imageUrl,
        };
        console.log("data ", data);

        axios
          .post("http://localhost:8800/api/addtaxi", data)
          .then((response) => {
            console.log("Booking successful", response.data);
            handleBooking();
            navigate(-1);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <div style={{ margin: "30px", paddingRight: "100px" }}>
          <form className="card p-3 bg-light" onSubmit={handleSubmit}>
            <div className="form-group row my-2 ">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Car Model
              </label>
              <div className="col-sm-10">
                <input
                  type="string"
                  className="form-control"
                  id="carModel"
                  placeholder="XYZ 123"
                  value={values.carModel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.carModel && touched.carModel ? (
                <p className="form-error">{errors.carModel}</p>
              ) : null}
            </div>
            <div className="form-group row my-2">
              <label htmlFor="city" className="col-sm-2 col-form-label">
                Price/day
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  placeholder="Price per day"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.city && touched.city ? (
                <p className="form-error">{errors.city}</p>
              ) : null}
            </div>
            <div className="form-group row my-2">
              <label htmlFor="people" className="col-sm-2 col-form-label">
                Max People
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="maxPeople"
                  placeholder="Price per day"
                  value={values.maxPeople}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="people" className="col-sm-2 col-form-label">
                Lisence No.
              </label>
              <div className="col-sm-10">
                <input
                  type="string"
                  className="form-control"
                  id="licenseNum"
                  placeholder="XYZ 123"
                  value={values.licenseNum}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="people" className="col-sm-2 col-form-label">
                imageUrl
              </label>
              <div className="col-sm-10">
                <input
                  type="string"
                  className="form-control"
                  id="imageUrl" // Change this to "imageUrl"
                  placeholder="http://image"
                  value={values.imageUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div className="form-group row my-2">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary">
                  Add Car
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default AddTaxi;
