import React, { useEffect, useState } from "react";

const Products = ({ foodObjects, handleDelete }) => {
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
