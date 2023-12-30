import React, { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
//import Logo from "../../../public/logo.png";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // const navigate = useNavigate();
  const logthisout = () => {
    localStorage.clear();
    window.location.reload();
    //alert("Great Shot!");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className="container-fluid d-lg-block"
      style={{ backgroundColor: "#023e10", color: "white" }}
    >
      <div className="container">
        <div className="row" style={{ alignItems: "center" }}>
          <div
            className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0"
            style={{ alignContent: "center" }}
          >
            <Link to="/" style={{ color: "grey", textDecoration: "none" }}>
              <img
                src="./img/logo.png"
                alt="logo"
                height={50}
                style={{ marginRight: "3.6rem" }}
              />
            </Link>
            <div className="d-inline-flex align-items-center">
              <p>
                <i className="fa fa-envelope mr-2"></i>fast@lhr.com
              </p>
              <p className="text-body px-3">|</p>
              <p>
                <i className="fa fa-phone-alt mr-2"></i>+92 345 67890
              </p>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex ">
              <a className="text-primary px-3 text-white" href="">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="text-primary px-3 text-white" href="">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-primary px-3 text-white" href="">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="text-primary px-3 text-white" href="">
                <i className="fab fa-instagram text-white"></i>
              </a>
              <a className="text-primary pl-3 text-white" href="">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
