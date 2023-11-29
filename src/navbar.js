import React, { useState } from "react";
import "./Styling/Navbar/navbar.css";

const Navbar = ({ changePage }) => {
  const hamburgerHandler = () => {
    var hamburgerContainer = document.querySelector(".hamburgerContainer");
    var mobileMenu = document.querySelector(".mobileMenu");
    hamburgerContainer.classList.toggle("hamburgerActive");
    mobileMenu.classList.toggle("menuActive");
  };
  return (
    <nav className="navbar">
      <h2>logo</h2>
      <div id="links">
        <button onClick={() => changePage(1)}>Produkty</button>
        <button onClick={() => changePage(2)}>Raport z dziś</button>
        <button onClick={() => changePage(3)}>Raport z 30 dni</button>
      </div>
      <button className="hamburgerContainer" onClick={hamburgerHandler}>
        <div className="bar0"></div>
        <div className="bar1"></div>
        <div className="bar2"></div>
      </button>
      <div className="mobileMenu">
        <button onClick={() => changePage(1)}>Produkty</button>
        <button onClick={() => changePage(2)}>Raport z dziś</button>
        <button onClick={() => changePage(3)}>Raport z 30 dni</button>
      </div>
    </nav>
  );
};

export default Navbar;
