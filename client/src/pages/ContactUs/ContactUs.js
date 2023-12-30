import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";

// import bootstrap;

function ContactUs() {
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  return (
    <div className="section">
      <div className="container-fluid ">
        <div className="container py-5">
          <div className="text-center mb-3 pb-3">
            <h1 className="text-success">Contact For Any Query</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="contact-form bg-white"
                style={{ padding: "30px" }}
              >
                <div id="success"></div>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    axios
                      .post("http://localhost:8800/send", {
                        name: values.name,
                        email: values.email,
                        subject: values.subject,
                        message: values.message,
                      })
                      .then(console.log("Contacted"));
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
                    <form
                      name="sentMessage"
                      id="contactForm"
                      noValidate="novalidate"
                      onSubmit={(e) => handleSubmit}
                    >
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="control-group">
                            <input
                              type="text"
                              className="form-control p-4"
                              id="name"
                              placeholder="Your Name"
                              required="required"
                              data-validation-required-message="Please enter your name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p className="help-block text-danger"></p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="control-group">
                            <input
                              type="email"
                              className="form-control p-4"
                              id="email"
                              placeholder="Your Email"
                              required="required"
                              data-validation-required-message="Please enter your email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p className="help-block text-danger"></p>
                          </div>
                        </div>
                      </div>

                      <div className="control-group">
                        <input
                          type="text"
                          className="form-control p-4"
                          id="subject"
                          placeholder="Subject"
                          required="required"
                          data-validation-required-message="Please enter a subject"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="control-group">
                        <textarea
                          className="form-control py-3 px-4"
                          rows="5"
                          id="message"
                          placeholder="Message"
                          required="required"
                          data-validation-required-message="Please enter your message"
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                      <div className="text-center">
                        <button
                          className="btn btn-success py-3 px-4"
                          type="submit"
                          id="sendMessageButton"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
