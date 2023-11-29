import React, { useState, useEffect } from "react";

const Products = ({ foodObjects, handleDelete, handleExpand }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return (
    <div className="addedElementsWrapper">
      {windowWidth >= 650
        ? foodObjects.map((foodObject) => (
            <div
              className="addedElement"
              key={foodObject.id}
              id={foodObject.id}
            >
              <p>{foodObject.name}</p>
              <p>{foodObject.kcal}</p>
              <p>{foodObject.proteins}</p>
              <p>{foodObject.carbs}</p>
              <p>{foodObject.fats}</p>
              <p>{foodObject.time}</p>
              <p>{foodObject.date}</p>
              <button onClick={() => handleDelete(foodObject.id)}>
                delete
              </button>
            </div>
          ))
        : foodObjects.map((foodObject) => (
            <div
              className="addedElement"
              key={foodObject.id}
              id={foodObject.id}
            >
              <div>
                <p>{foodObject.name}</p>
                <p>{foodObject.date}</p>
                <button
                  className="expand"
                  onClick={() => handleExpand(foodObject.id)}
                >
                  rozwiń ⬇
                </button>
                <button onClick={() => handleDelete(foodObject.id)}>
                  delete
                </button>
              </div>
              <p className="expandedProduct">{foodObject.kcal} kcal</p>
              <p className="expandedProduct">
                {foodObject.proteins} grams fo protein
              </p>
              <p className="expandedProduct">
                {foodObject.carbs} grams of carbs
              </p>
              <p className="expandedProduct">{foodObject.fats} grams of fats</p>
              <p className="expandedProduct">{foodObject.time}</p>
            </div>
          ))}
    </div>
  );
};

export default Products;
