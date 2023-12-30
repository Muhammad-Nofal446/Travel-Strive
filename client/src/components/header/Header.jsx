import React, { useEffect } from "react";
import "../navbar/navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useRef } from "react";
import {
  faBed,
  faCalendarDays,
  faPerson,
  faTaxi,
  faContactBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { SearchContext } from "../../context/SearchContext";
import Dropdown from "react-bootstrap/Dropdown";
import useFetch from "../../hooks/useFetch";
// const navigate = useNavigate();

const Header = ({ type,sessionUser }) => {
  const { data, loading, error } = useFetch("http://localhost:8800/api/hotels");
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [hotels, setHotels] = useState({});
  useEffect(() => {
    if (data && JSON.stringify(data) !== "[]") {
      const _hotels = {};
      data.forEach((hotel) => {
        _hotels[hotel.city] = hotel.city;
      });
      setHotels(_hotels);
    }
  }, [data]);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [userState, setUserState] = useState();

  // var { user } = useContext(AuthContext);

  useEffect(() => {
    setUserState(sessionUser);
  }, [sessionUser]);

  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(SearchContext);

  const logthisout = () => {
    localStorage.clear();
    setUserState("");
    clearAllCookies();

    // console.log(user);
    // window.location.reload();
    //alert("Great Shot!");
    navigate("/login");
  };

  function clearAllCookies() {
    // Get all cookies
    const cookies = document.cookie.split(";");

    // Iterate through cookies and remove each one
    cookies.forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }

  // Call the function to clear all cookies

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div
      className="header"
      style={{
        paddingLeft: "120px",
      }}
    >
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList ">
          <div
            className={`headerListItem ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <FontAwesomeIcon icon={faBed} />
              <span> Stays</span>
            </Link>
          </div>
          <div
            className={`headerListItem ${
              location.pathname === "/taxi" ? "active" : ""
            }`}
          >
            <Link to="/taxi" style={{ color: "white", textDecoration: "none" }}>
              <FontAwesomeIcon icon={faTaxi} />
              <span> Taxis</span>
            </Link>
          </div>
          <div
            className={`headerListItem ${
              location.pathname === "/contact-us" ? "active" : ""
            }`}
          >
            <Link
              to="/contact-us"
              style={{ color: "white", textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faContactBook} />
              <span> ContactUs</span>
            </Link>
          </div>
          <div
            className={`headerListItem ${
              location.pathname === "/taxi-bookings" ? "active" : ""
            }`}
          >
            {sessionUser.isAdmin && (
              <Link
                to="/taxi-bookings"
                style={{ color: "white", textDecoration: "none" }}
              >
                <FontAwesomeIcon icon={faContactBook} />
                <span> Texi Bookings</span>
              </Link>
            )}
          </div>
          <div
            className={`headerListItem ${
              location.pathname === "/hotel-bookings" ? "active" : ""
            }`}
          >
            {sessionUser.isAdmin && (
              <Link
                to="/hotel-bookings"
                style={{ color: "white", textDecoration: "none" }}
              >
                <FontAwesomeIcon icon={faContactBook} />
                <span>Hotel Bookings</span>
              </Link>
            )}
          </div>
        </div>
        {location.pathname === "/" && (
          <>
            <p className="headerDesc ">Wanna Book Room?</p>
            {/* {!user && <button className="headerBtn">Sign in / Register</button>} */}
            <div className="headerSearch py-4" style={{ marginRight: "12px" }}>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                {/* <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                /> */}
                <select
                  placeholder="Where are you going?"
                  className="form-control"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option>Select Destination</option>

                  {Object.keys(hotels).map((hotel) => (
                    <option>{hotel}</option>
                  ))}
                </select>
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="navContainer">
      {/* <div className="navContainer" style={{ marginLeft: "450px" }}> */}
        {sessionUser ? (
          <div>
            <div className="navbar">
            {/* <div className="navbar" style={{ marginLeft: "-10rem" }}> */}
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <span>{sessionUser?.username}&nbsp;&nbsp;</span>
                  <i
                    className="fa fa-user border border-white rounded-circle p-1"
                    aria-hidden="true"
                  ></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/:id">Profile</Dropdown.Item>
                  <Dropdown.Item href="/taxi/orders">Taxi Orders</Dropdown.Item>
                  <Dropdown.Item href="/room/orders">Room Orders</Dropdown.Item>
                  {sessionUser.isAdmin === true && (
                    <Dropdown.Item href="/signup/admin">
                      Signup Admin
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={logthisout} style={{ color: "red" }}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        ) : (
          <div className="navItems">
            {/* <button className="navButton">Register</button> */}
            <Link to="/Login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
