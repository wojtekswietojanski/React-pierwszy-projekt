import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Home from "./home";
import Today from "./today";
import ThisMonth from "./thisMonth";

function App() {
  const [foodObjects, setFoodObjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (index) => {
    var hamburgerContainer = document.querySelector(".hamburgerContainer");
    var mobileMenu = document.querySelector(".mobileMenu");
    hamburgerContainer.classList.toggle("hamburgerActive");
    mobileMenu.classList.toggle("menuActive");
    if (index === 1 || index === 2 || index === 3 || index === 4) {
      setCurrentPage(index);
    }
  };
  return (
    <div className="App">
      <Navbar changePage={changePage}></Navbar>
      {currentPage == 1 && (
        <Home foodObjects={foodObjects} setFoodObjects={setFoodObjects} />
      )}
      {currentPage == 2 && <Today foodObjects={foodObjects} />}
      {currentPage == 3 && <ThisMonth foodObjects={foodObjects} />}
    </div>
  );
}

export default App;
