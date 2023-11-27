import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Home from "./home";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (index) => {
    if (index === 1 || index === 2 || index === 3 || index === 4) {
      setCurrentPage(index);
    }
  };
  return (
    <div className="App">
      <Navbar changePage={changePage}></Navbar>
      {currentPage == 1 && <Home />}
    </div>
  );
}

export default App;
