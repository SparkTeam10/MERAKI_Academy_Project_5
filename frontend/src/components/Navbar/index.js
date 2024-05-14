import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav>
      <h1>Spark</h1>

      <NavLink to="/">Home</NavLink>
      <NavLink to="about">About</NavLink>
      <NavLink to="help">Help</NavLink>
      <NavLink to="category">Category</NavLink>
      <NavLink to="register">register</NavLink>
      <NavLink to="/allserviceprovider">All-Service</NavLink>
      <NavLink to="login"> Login </NavLink>
      <NavLink to="Booking"> Booking </NavLink>
    </nav>
  );
};

export default Navbar;
