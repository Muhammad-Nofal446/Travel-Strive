import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Taxi from "./pages/taxis/Taxi";
import TaxiBooking from "./pages/taxis/TaxiBooking";
import ContactUs from "./pages/ContactUs/ContactUs";
import Profile from "./pages/profile/profile";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import TexiOrders from "./pages/Order/TexiOrders"
import RoomOrders from "./pages/Order/RoomOrders"
import AdminDashboard from "./admin/adminDashBoard";
import Stripe from "./pages/payment/Stripe";
import AddTaxi from "./pages/taxis/AddTaxi";
import TexiBooking from "./pages/texi-booking/TexiBooking";
import { tryToParse } from "./components/utils/utils";
import HotelBooking from "./components/table/HotelBooking";
import StripeApp from "./pages/react-stripe/StripeApp";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const adminPage = location.pathname === "/admin-dashboard";

  let sessionUser = {};

  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    if (cookie.includes("user")) {
      sessionUser = tryToParse(cookie.split("user=")[1]);
    }
  }

  if (sessionUser && sessionUser.username) {
    return (
      <div>
        <ToastContainer />
        {isLoginPage ? null : <Navbar style />}
        {isLoginPage ? null : <Header type="list" sessionUser={sessionUser} />}

        {/* <Navbar style /> */}
        {/* <Header type="list" /> */}
        <Routes>
          <Route path="/" element={<Home sessionUser={sessionUser} />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel user={sessionUser} />} />
          <Route path="/signup/user" element={<SignUp isAdmin={false} role={"user"} />} />
          <Route path="/signup/admin" element={<SignUp isAdmin={true} role={"admin"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/:id" element={<Profile sessionUser={sessionUser} />} />
          <Route path="/taxi/orders" element={<TexiOrders sessionUser={sessionUser} />} />
          <Route path="/room/orders" element={<RoomOrders sessionUser={sessionUser} />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/taxi" element={<Taxi user={sessionUser} />} />
          <Route path="/add-taxi" element={<AddTaxi />} />
          <Route path="/payment" element={<Stripe />} />
          <Route path="/stripe-form" element={<StripeApp />} />
          <Route path="/taxi-bookings" element={<TexiBooking />} />
          <Route path="/hotel-bookings" element={<HotelBooking />} />
          <Route path="/taxi-booking/:id" element={<TaxiBooking sessionUser={sessionUser} />} />
        </Routes>
        {isLoginPage ? null : <Footer style />}
      </div>
    );
  }
  else {
    return <Login />
  }
}

export default App;
