import FoodProducts from "./foodProducts";
import "./Styling/Home/home.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [elements, setElements] = useState([]);
  var elementsContainer = [];

  function createSortedArrayFromLocalStorage() {
    const keys = Object.keys(localStorage);
    const sortedArray = keys
      .map((key) => {
        return { id: parseInt(key, 10), content: localStorage.getItem(key) };
      })
      .sort((a, b) => b.id - a.id);

    return sortedArray;
  }

  function addObjectToArrayFromLocalStorage() {
    elementsContainer.length = 0;
    elementsContainer = createSortedArrayFromLocalStorage();
    setElements(elementsContainer);
  }

  const addElementHandler = () => {
    const inputs = document.querySelectorAll(".home input");
    var inputContent = "";
    inputs.forEach((input) => {
      inputContent += input.value;
      inputContent += "//";
    });
    localStorage.setItem(localStorage.length + 1, inputContent);
    addObjectToArrayFromLocalStorage();
  };

  useEffect(() => {
    addObjectToArrayFromLocalStorage();
  }, []);

  useEffect(() => {
    console.log(elements);
  }, [elements]);

  return (
    <div className="home">
      <input type="text" name="nazwaproduktu" placeholder="Nazwa produktu" />
      <input type="number" name="kcal" placeholder="kaloryczność" />
      <input
        type="number"
        name="protein"
        placeholder="Zawartość białka w gramach"
      />
      <input
        type="number"
        name="carbs"
        placeholder="Zawartość węglowodanów w gramach"
      />
      <input
        type="text"
        name="fat"
        placeholder="Zawartość tłuszczy w gramach"
      />
      <button onClick={addElementHandler}>kliknij mnie!</button>
      <FoodProducts elements={elements} />
    </div>
  );
};

export default Home;
