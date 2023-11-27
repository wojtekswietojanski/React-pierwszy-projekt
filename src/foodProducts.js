import React, { useEffect, useState } from "react";

const Products = ({ foodObjects, handleDelete }) => {
  const [foodObjectsToday, setFoodObjectsToday] = useState([]);

  useEffect(() => {
    filterToday();
  }, [foodObjects]);

  const filterToday = () => {
    var foodObjectsTodayContainer = [];
    foodObjects.map((foodObject) => {
      var today = new Date();
      var day = today.getDate();
      var month = today.getMonth() + 1;
      var year = today.getFullYear();
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + day;
      }

      var todayDate = day + "." + month + "." + year;

      if (foodObject.date == todayDate) {
        foodObjectsTodayContainer.push(foodObject);
      }
      setFoodObjectsToday(foodObjectsTodayContainer);
    });
  };

  return (
    <div className="addedElementsWrapper">
      {foodObjects.map((foodObject) => (
        <div className="addedElement" key={foodObject.id} id={foodObject.id}>
          <p>{foodObject.name}</p>
          <p>{foodObject.kcal}</p>
          <p>{foodObject.proteins}</p>
          <p>{foodObject.carbs}</p>
          <p>{foodObject.fats}</p>
          <p>{foodObject.time}</p>
          <p>{foodObject.date}</p>
          <button onClick={() => handleDelete(foodObject.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
