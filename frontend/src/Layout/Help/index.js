import React from "react";
import "./style.css"
import { NavLink } from "react-router-dom";
const Help = () => {
  return (
    <div>
      {/* <nav>
        <NavLink>contact</NavLink>
      </nav> */}
      <div className="help-container">
        <h1>Welcome to the Help Page</h1>
        <p>If you need assistance, feel free to contact our support team.</p>
        <div className="contact-info">
          <h2>Contact Information:</h2>
          <p>Email: spark@gmail.com</p>
          <p>Phone Number:  +962787023107</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
