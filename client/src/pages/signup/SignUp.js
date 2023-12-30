import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap"; // Assuming you're using Bootstrap
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { signupSchema } from "./SignUpSchema";
import axios from "axios";

import Card from "react-bootstrap/Card";
import ToastEmitter from "../../components/notification/Notification";

function FormValidation(props) {
  const { isAdmin, role } = props
  const initialValues = {
    username: "",
    email: "",
    country: "",
    img: "",
    city: "",
    phone: "",
    password: "",
    role: role,
    isAdmin: isAdmin,
    confirm_password: "",
  };
  const navigate = useNavigate();
  const backgroundStyle = {
    // backgroundImage:
    //   'url("https://memes.co.in/wallpapers/uploads/1625904063.jpg")',

    margin: "24rem",
  };
  //   const navigate = useNavigate();

  const registerUser = values => {
    axios
      .post("http://localhost:8800/api/auth/register", {
        username: values.username,
        email: values.email,
        country: values.country,
        img: values.img,
        city: values.city,
        phone: values.phone,
        password: values.password,
        isAdmin: isAdmin,
      })
      .then(
        () => navigate("/login")
      ).catch((err) => {
        ToastEmitter({
          msg: err.response.data.message,
          type: "error"
        })
        console.log(err)
      })
  }
  return (
    <Container className="my-5 mx-10 " style={backgroundStyle}>
      <Row>
        <Col>
          <Card>
            <Formik
              initialValues={initialValues}
              validationSchema={signupSchema}
              onSubmit={(values) => registerUser(values)}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <Row className="justify-content-center">
                  <Col>
                    <Form
                      onSubmit={handleSubmit}
                      style={{
                        background: "rgba(240, 240, 240)",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <h3 className="mb-4 text-success">Register Form</h3>
                      <Form.Group>
                        <Form.Label htmlFor="username">Name:</Form.Label>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          name="username"
                          id="username"
                          placeholder="Name"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.username && touched.username ? (
                          <p className="form-error">{errors.username}</p>
                        ) : null}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="email">Email:</Form.Label>
                        <Form.Control
                          type="email"
                          autoComplete="off"
                          name="email"
                          id="email"
                          placeholder="Email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                          <p className="form-error">{errors.email}</p>
                        ) : null}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="phone">Phone no.</Form.Label>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          name="phone"
                          id="phone"
                          placeholder="03XX-XXXXXXX"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="country">Country:</Form.Label>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          name="country"
                          id="country"
                          placeholder="Country"
                          value={values.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="city">City:</Form.Label>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          name="city"
                          id="city"
                          placeholder="City"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="password">Password:</Form.Label>
                        <Form.Control
                          type="password"
                          autoComplete="off"
                          name="password"
                          id="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                          <p className="form-error">{errors.password}</p>
                        ) : null}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="confirm_password">
                          Confirm Password:
                        </Form.Label>
                        <Form.Control
                          type="password"
                          autoComplete="off"
                          name="confirm_password"
                          id="confirm_password"
                          placeholder="Confirm Password"
                          value={values.confirm_password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.confirm_password && touched.confirm_password ? (
                          <p className="form-error">
                            {errors.confirm_password}
                          </p>
                        ) : null}
                      </Form.Group>
                      <Button variant="success" type="submit" className="my-3">
                        Register
                      </Button>
                    </Form>
                  </Col>
                </Row>
              )}
            </Formik>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default FormValidation;
