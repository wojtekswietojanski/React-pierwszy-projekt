import Products from "./foodProducts";
import "./Styling/Home/home.css";
import { useState, useEffect } from "react";

const Home = ({ foodObjects, setFoodObjects }) => {
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

  function addObjectsToArrayFromLocalStorage() {
    elementsContainer.length = 0;
    elementsContainer = createSortedArrayFromLocalStorage();
    setElements(elementsContainer);
  }

  function obecnaData() {
    var dzisiaj = new Date();

    var dzien = dzisiaj.getDate();
    var minuta = dzisiaj.getMinutes();
    var godzina = dzisiaj.getHours();
    var miesiac = dzisiaj.getMonth() + 1; // Miesiące są indeksowane od 0, więc dodajemy 1
    var rok = dzisiaj.getFullYear();

    // Formatowanie z zerowaniem dla jednocyfrowych wartości
    if (dzien < 10) dzien = "0" + dzien;
    if (minuta < 10) minuta = "0" + minuta;
    if (godzina < 10) godzina = "0" + godzina;
    if (miesiac < 10) miesiac = "0" + miesiac;

    var dataString =
      godzina + ":" + minuta + "/" + dzien + "." + miesiac + "." + rok + "/";
    return dataString;
  }

  const addElementHandler = () => {
    const inputs = document.querySelectorAll(".home input");
    var inputContent = "";
    var counter = 0;
    inputs.forEach((input) => {
      inputContent += input.value;
      if (Number(input.value)) {
        counter += 1;
      }
      inputContent += "/";
    });
    inputContent += obecnaData();
    if (counter === 4) {
      localStorage.setItem(localStorage.length + 1, inputContent);
      addObjectsToArrayFromLocalStorage();
    } else {
      window.alert("błędnie wprowadzone dane");
    }
  };

  function sortKeys() {
    var keys = Object.keys(localStorage);

    keys.sort(function (a, b) {
      return a.localeCompare(b);
    });

    for (var i = 0; i < keys.length; i++) {
      var klucz = keys[i];
      var wartosc = localStorage.getItem(klucz);

      localStorage.removeItem(klucz);

      localStorage.setItem((i + 1).toString(), wartosc);
    }
  }

  class FoodObject {
    constructor(name, kcal, proteins, carbs, fats, time, date, id) {
      this.name = name;
      this.kcal = kcal;
      this.proteins = proteins;
      this.carbs = carbs;
      this.fats = fats;
      this.time = time;
      this.date = date;
      this.id = id;
    }
  }

  function getFromStringAndDelete(str, x) {
    let fragment = null;
    for (let i = 0; i < x; i++) {
      const indexZnaku = str.indexOf("/");
      if (indexZnaku !== -1) {
        fragment = str.substring(0, indexZnaku);
        str = str.substring(indexZnaku + 1);
      }
    }
    return fragment;
  }

  const elementsToObjects = () => {
    setFoodObjects([]);
    var objectContainer = [];

    elements.map((element) => {
      let objectContent = element.content;
      let objectName = getFromStringAndDelete(objectContent, 1);
      let objectKcal = getFromStringAndDelete(objectContent, 2);
      let objectProteins = getFromStringAndDelete(objectContent, 3);
      let objectCarbs = getFromStringAndDelete(objectContent, 4);
      let objectFats = getFromStringAndDelete(objectContent, 5);
      let objectTime = getFromStringAndDelete(objectContent, 6);
      let objectDate = getFromStringAndDelete(objectContent, 7);
      let objectId = element.id;
      let singleObject = new FoodObject(
        objectName,
        objectKcal,
        objectProteins,
        objectCarbs,
        objectFats,
        objectTime,
        objectDate,
        objectId
      );

      objectContainer.push(singleObject);
      return null;
    });
    setFoodObjects(objectContainer);
  };

  const handleDelete = (idOfItem) => {
    localStorage.removeItem(idOfItem);
    sortKeys();
    addObjectsToArrayFromLocalStorage();
  };

  useEffect(() => {
    addObjectsToArrayFromLocalStorage();
    elementsToObjects();
  }, []);

  useEffect(() => {
    elementsToObjects();
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
      <button onClick={addElementHandler}>DODAJ</button>
      <Products foodObjects={foodObjects} handleDelete={handleDelete} />
    </div>
  );
};

export default Home;
