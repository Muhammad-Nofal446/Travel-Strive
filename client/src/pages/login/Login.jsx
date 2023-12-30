import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./login.css";
import React from "react";
import ToastEmitter from "../../components/notification/Notification";

const Login = () => {
  const superAdmin = ["john4"];
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      const _user = structuredClone(res.data.details);
      document.cookie =
        "user" +
        "=" +
        JSON.stringify({
          id: _user._id,
          username: _user.username,
          role: _user.role,
          email: _user.email,
          country: _user.country,
          phone: _user.phone,
          img: _user.img,
          city: _user.city,
          isAdmin: res.data.isAdmin,
        });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      const msg = `${res.data.details.username} login successfully`,
        type = "success";
      const notification = {
        msg: msg,
        type: type,
      };
      ToastEmitter(notification);
      if (res.data.details.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      const msg = err.response.data.message,
        type = "error";
      const notification = {
        msg: msg,
        type: type,
      };
      ToastEmitter(notification);
    }
    console.log("login");
  };

  return (
    <div
      className="col-lg-5 border border-success rounded"
      style={{ margin: "5rem 25rem" }}
    >
      <div className="card border-0 ">
        <div className="card-header bg-success text-center p-4">
          <h1 className="text-white m-0">Log In Now</h1>
        </div>
        <div className="card-body rounded-bottom bg-white p-5">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control p-3 lInput mb-2"
                placeholder="Your name"
                required="required"
                id="username"
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <input
                required="required"
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                className="lInput form-control p-3 mb-3"
                autoComplete="off"
              />
            </div>

            <div>
              <Button
                className="btn btn-success btn-block py-2 px-4 mb-2 fw-bolder"
                type="submit"
                onClick={handleClick}
              >
                Login
              </Button>
            </div>

            <span>
              Don't have an account{" "}
              <Link to="/signup/user" className="lButton">
                User Sign Up
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
