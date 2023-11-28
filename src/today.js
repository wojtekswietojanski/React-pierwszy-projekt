import { useState, useEffect } from "react";
import "./Styling/Today/today.css";

const Today = ({ foodObjects }) => {
  const [foodObjectsToday, setFoodObjectsToday] = useState([]);
  const [foodObjectsThisMonth, setFoodObjectsThisMonth] = useState([]);
  const [foodObjectsTodaySumarized, setFoodObjectsTodaySumarized] = useState({
    kcal: "",
    proteins: "",
    carbs: "",
    fats: "",
  });
  const [foodObjectsThisMonthAverage, setFoodObjectsThisMonthAverage] =
    useState({ kcal: "", proteins: "", carbs: "", fats: "" });

  class FoodObjectData {
    constructor(kcal, proteins, carbs, fats) {
      this.kcal = kcal;
      this.proteins = proteins;
      this.carbs = carbs;
      this.fats = fats;
    }
  }

  useEffect(() => {
    filterData();
  }, [foodObjects]);

  useEffect(() => {
    sumarizeData();
  }, [foodObjectsToday]);

  const filterData = () => {
    var foodObjectsTodayContainer = [];
    var foodObjectsThisMonthContainer = [];
    foodObjects.map((foodObject) => {
      var today = new Date();
      var day = today.getDate();
      var month = today.getMonth() + 1;
      var year = today.getFullYear();
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }

      var todayDate = day + "." + month + "." + year;
      var thisMonth = month + "." + year;

      if (foodObject.date == todayDate) {
        foodObjectsTodayContainer.push(foodObject);
      } else if (foodObject.date.endsWith(thisMonth)) {
        foodObjectsThisMonthContainer.push(foodObject);
      }
      setFoodObjectsToday(foodObjectsTodayContainer);
      setFoodObjectsThisMonth(foodObjectsThisMonthContainer);
    });
  };

  const sumarizeData = () => {
    var kcalToday = 0;
    var proteinToday = 0;
    var carbsToday = 0;
    var fatsToday = 0;

    var DaysInMonth = [];
    var kcalMonthAverage = 0;
    var proteinMonthAverage = 0;
    var carbsMonthAverage = 0;
    var fatsMonthAverage = 0;

    foodObjectsToday.map((foodObjectToday) => {
      kcalToday += Number(foodObjectToday.kcal);
      proteinToday += Number(foodObjectToday.proteins);
      carbsToday += Number(foodObjectToday.carbs);
      fatsToday += Number(foodObjectToday.fats);
    });

    foodObjectsThisMonth.map((foodObjectThisMonth) => {
      kcalMonthAverage += Number(foodObjectThisMonth.kcal);
      proteinMonthAverage += Number(foodObjectThisMonth.proteins);
      carbsMonthAverage += Number(foodObjectThisMonth.carbs);
      fatsMonthAverage += Number(foodObjectThisMonth.fats);
      if (!DaysInMonth.includes(foodObjectThisMonth.date)) {
        DaysInMonth.push(foodObjectThisMonth.date);
      }
    });

    var objectContainerDay = new FoodObjectData(
      kcalToday,
      proteinToday,
      carbsToday,
      fatsToday
    );
    var objectContainerMonth = new FoodObjectData(
      kcalMonthAverage / DaysInMonth.length,
      proteinMonthAverage / DaysInMonth.length,
      carbsMonthAverage / DaysInMonth.length,
      fatsMonthAverage / DaysInMonth.length
    );

    setFoodObjectsTodaySumarized(objectContainerDay);
    setFoodObjectsThisMonthAverage(objectContainerMonth);
  };

  return (
    <div className="todayDivContainer">
      <div className="todayDiv"></div>
      <div className="todayDiv">
        <p>
          Dziś zjadłeś <b>{foodObjectsTodaySumarized.kcal}</b> kalorii,{" "}
          <b>{foodObjectsTodaySumarized.proteins}</b> gram białka,{" "}
          <b>{foodObjectsTodaySumarized.carbs}</b> gram węglowodanów,{" "}
          <b>{foodObjectsTodaySumarized.fats}</b> gram tłuszczy
        </p>

        <p>
          Dzisiejsza podaż kalorii{" "}
          {foodObjectsTodaySumarized.kcal - foodObjectsThisMonthAverage.kcal < 0
            ? `jest mniejsza o ${Math.abs(
                foodObjectsTodaySumarized.kcal -
                  foodObjectsThisMonthAverage.kcal
              )} niż średnia podaż kalorii w tym miesiącu`
            : foodObjectsTodaySumarized.kcal -
                foodObjectsThisMonthAverage.kcal >
              0
            ? `jest większa o ${Math.abs(
                foodObjectsTodaySumarized.kcal -
                  foodObjectsThisMonthAverage.kcal
              )} niż średnia podaż kalorii w tym miesiącu`
            : "jest równa średniej podaży kalorii w tym miesiącu"}
        </p>
        <p>
          {" "}
          Dzisiejsza podaż białka{" "}
          {foodObjectsTodaySumarized.proteins -
            foodObjectsThisMonthAverage.proteins <
          0
            ? `jest mniejsza o ${Math.abs(
                foodObjectsTodaySumarized.proteins -
                  foodObjectsThisMonthAverage.proteins
              )} niż średnia podaż białka w tym miesiącu`
            : foodObjectsTodaySumarized.proteins -
                foodObjectsThisMonthAverage.proteins >
              0
            ? `jest większa o ${Math.abs(
                foodObjectsTodaySumarized.proteins -
                  foodObjectsThisMonthAverage.proteins
              )} niż średnia podaż białka w tym miesiącu`
            : "jest równa średniej podaży białka w tym miesiącu"}
        </p>
        <p>
          Dzisiejsza podaż węglowodanów{" "}
          {foodObjectsTodaySumarized.carbs - foodObjectsThisMonthAverage.carbs <
          0
            ? `jest mniejsza o ${Math.abs(
                foodObjectsTodaySumarized.carbs -
                  foodObjectsThisMonthAverage.carbs
              )} niż średnia podaż węglowodanów w tym miesiącu`
            : foodObjectsTodaySumarized.carbs -
                foodObjectsThisMonthAverage.carbs >
              0
            ? `jest większa o ${Math.abs(
                foodObjectsTodaySumarized.carbs -
                  foodObjectsThisMonthAverage.carbs
              )} niż średnia podaż węglowodanów w tym miesiącu`
            : "jest równa średniej podaży węglowodanów w tym miesiącu"}
        </p>

        <p>
          Dzisiejsza podaż tłuszczu{" "}
          {foodObjectsTodaySumarized.fats - foodObjectsThisMonthAverage.fats < 0
            ? `jest mniejsza o ${Math.abs(
                foodObjectsTodaySumarized.fats -
                  foodObjectsThisMonthAverage.fats
              )} niż średnia podaż tłuszczu w tym miesiącu`
            : foodObjectsTodaySumarized.fats -
                foodObjectsThisMonthAverage.fats >
              0
            ? `jest większa o ${Math.abs(
                foodObjectsTodaySumarized.fats -
                  foodObjectsThisMonthAverage.fats
              )} niż średnia podaż tłuszczu w tym miesiącu`
            : "jest równa średniej podaży tłuszczu w tym miesiącu"}
        </p>
      </div>
    </div>
  );
};

export default Today;
