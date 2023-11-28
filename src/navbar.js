import React, { useState } from "react";
import "./Styling/Navbar/navbar.css";

const Navbar = ({ changePage }) => {
  return (
    <nav className="navbar">
      <h2>logo</h2>
      <div>
        <button onClick={() => changePage(1)}>Produkty</button>
        <button onClick={() => changePage(2)}>Raport z dziś</button>
        <button onClick={() => changePage(3)}>Raport z 30 dni</button>
      </div>
    </nav>
  );
};

export default Navbar;
