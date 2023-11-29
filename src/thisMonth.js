import React, { useEffect, useState } from "react";
import "./Styling/ThisMonth/thisMonth.css";
import NutritionsDistribution from "./charts/nutritionsDistribution";
import LineCharts from "./charts/lineChart";

const ThisMonth = ({ foodObjects }) => {
  const [foodObjectsThisMonth, setFoodObjectsThisMonth] = useState([]);
  const [foodObjectsThisMonthAverage, setFoodObjectsThisMonthAverage] =
    useState({ kcal: "", proteins: "", carbs: "", fats: "" });
  const [foodObjectMaximum, setFoodObjectMaximum] = useState({
    kcal: "",
    proteins: "",
    carbs: "",
    fats: "",
  });
  const [foodObjectsDaysInMonth, setFoodObjectsDaysInMonth] = useState([
    { kcal: "", proteins: "", carbs: "", fats: "" },
  ]);

  class FoodObjectData {
    constructor(kcal, proteins, carbs, fats) {
      this.kcal = kcal;
      this.proteins = proteins;
      this.carbs = carbs;
      this.fats = fats;
    }
  }

  class FoodObjectDayInMonthData {
    constructor(kcal, proteins, carbs, fats, day) {
      this.kcal = kcal;
      this.proteins = proteins;
      this.carbs = carbs;
      this.fats = fats;
      this.day = day;
    }
  }

  useEffect(() => {
    filterData();
  }, [foodObjects]);

  useEffect(() => {
    calculateAverage();
    claculateDaysInMonth();
  }, [foodObjectsThisMonth]);

  useEffect(() => {
    calculateMaximum();
  }, [foodObjectsThisMonthAverage]);

  const filterData = () => {
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

      var thisMonth = month + "." + year;

      if (foodObject.date.endsWith(thisMonth)) {
        foodObjectsThisMonthContainer.push(foodObject);
      }
      setFoodObjectsThisMonth(foodObjectsThisMonthContainer);
    });
  };

  const calculateAverage = () => {
    var DaysInMonth = [];
    var kcalMonthAverage = 0;
    var proteinMonthAverage = 0;
    var carbsMonthAverage = 0;
    var fatsMonthAverage = 0;

    foodObjectsThisMonth.map((foodObjectThisMonth) => {
      kcalMonthAverage += Number(foodObjectThisMonth.kcal);
      proteinMonthAverage += Number(foodObjectThisMonth.proteins);
      carbsMonthAverage += Number(foodObjectThisMonth.carbs);
      fatsMonthAverage += Number(foodObjectThisMonth.fats);
      if (!DaysInMonth.includes(foodObjectThisMonth.date)) {
        DaysInMonth.push(foodObjectThisMonth.date);
      }
    });

    var objectContainerMonth = new FoodObjectData(
      kcalMonthAverage / DaysInMonth.length,
      proteinMonthAverage / DaysInMonth.length,
      carbsMonthAverage / DaysInMonth.length,
      fatsMonthAverage / DaysInMonth.length
    );

    setFoodObjectsThisMonthAverage(objectContainerMonth);
  };

  const claculateDaysInMonth = () => {
    var container = [];
    var days = [];
    foodObjectsThisMonth.map((foodObjectThisMonth) => {
      let dayOfMonth = foodObjectThisMonth.date.substring(0, 2);
      if (!days.includes(dayOfMonth)) {
        days.unshift(dayOfMonth);
      }
    });
    for (let i = 0; i < days.length; i++) {
      var kcalSum = 0;
      var proteinsSum = 0;
      var carbsSum = 0;
      var fatsSum = 0;
      foodObjectsThisMonth.map((foodObjectThisMonth) => {
        if (foodObjectThisMonth.date.startsWith(days[i])) {
          kcalSum += Number(foodObjectThisMonth.kcal);
          proteinsSum += Number(foodObjectThisMonth.proteins);
          carbsSum += Number(foodObjectThisMonth.carbs);
          fatsSum += Number(foodObjectThisMonth.fats);
        }
      });

      let day = new FoodObjectDayInMonthData(
        kcalSum,
        proteinsSum,
        carbsSum,
        fatsSum,
        days[i]
      );

      container.push(day);
    }
    setFoodObjectsDaysInMonth(container);
  };

  const calculateMaximum = () => {
    var proteins = 0;
    var carbs = 0;
    var fats = 0;
    var kcal = 0;
    foodObjectsDaysInMonth.forEach((dayInMonth) => {
      if (dayInMonth.kcal > kcal) {
        kcal = dayInMonth.kcal;
      }

      if (dayInMonth.proteins > proteins) {
        proteins = dayInMonth.proteins;
      }

      if (dayInMonth.carbs > carbs) {
        carbs = dayInMonth.carbs;
      }

      if (dayInMonth.fats > fats) {
        fats = dayInMonth.fats;
      }
    });

    setFoodObjectMaximum(new FoodObjectData(kcal, proteins, carbs, fats));
  };

  useEffect(() => {
    if (!Math.round(foodObjectsThisMonthAverage.kcal)) {
      foodObjectsThisMonthAverage.kcal = 0;
    }
    if (!Math.round(foodObjectsThisMonthAverage.proteins)) {
      foodObjectsThisMonthAverage.proteins = 0;
    }
    if (!Math.round(foodObjectsThisMonthAverage.carbs)) {
      foodObjectsThisMonthAverage.carbs = 0;
    }
    if (!Math.round(foodObjectsThisMonthAverage.fats)) {
      foodObjectsThisMonthAverage.fats = 0;
    }
  }, [foodObjectsThisMonthAverage]);

  return (
    <div id="thisMonth">
      <div id="kcalChart">
        <LineCharts foodObjectsDaysInMonth={foodObjectsDaysInMonth} />
      </div>
      <div className="monthSmallerComponents">
        <NutritionsDistribution
          foodObjectsDaysInMonth={foodObjectsDaysInMonth}
        />
      </div>
      <div className="monthSmallerComponents">
        <p>
          Średnie spożycie kalorii w ciągu bieżącego miesiąca:{" "}
          <b>{Math.round(foodObjectsThisMonthAverage.kcal)}</b>
        </p>
        <p>
          Średnie spożycie białka w ciągu bieżącego miesiąca:{" "}
          <b>{Math.round(foodObjectsThisMonthAverage.proteins)}</b>
        </p>
        <p>
          Średnie spożycie węglowodanów w ciągu bieżącego miesiąca:{" "}
          <b>{Math.round(foodObjectsThisMonthAverage.carbs)}</b>
        </p>
        <p>
          Średnie spożycie tłuszczy w ciągu bieżącego miesiąca:{" "}
          <b>{Math.round(foodObjectsThisMonthAverage.fats)}</b>
        </p>
        <p>
          Maksymalne dzienne spożycie kalorii w ciągu miesiąca:{" "}
          <b>{foodObjectMaximum.kcal}</b>
        </p>
        <p>
          Maksymalne dzienne spożycie białka w ciągu miesiąca:{" "}
          <b>{foodObjectMaximum.proteins}</b>
        </p>
        <p>
          Maksymalne dzienne spożycie węglowodanów w ciągu miesiąca:{" "}
          <b>{foodObjectMaximum.carbs}</b>
        </p>
        <p>
          Maksymalne dzienne spożycie tłuszczy w ciągu miesiąca:{" "}
          <b>{foodObjectMaximum.fats}</b>
        </p>
      </div>
    </div>
  );
};

export default ThisMonth;
