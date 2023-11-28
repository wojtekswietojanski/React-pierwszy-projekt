import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const CalorieDoughnut = ({ foodObjectsTodaySumarized }) => {
  const [calorieDoughnutData, setCalorieDoughnutData] = useState({
    labels: [
      "dzisiejsza podaż kalori",
      "Sugerowane dzienne zapotrzebowanie kaloryczne",
    ],
    datasets: [
      {
        label: "Sugerowane dzienne spożycie kalorii",
        data: [0, 2000],
        backgroundColor: ["green", "whitesmoke"],
        borderColor: ["green", "green"],
      },
    ],
  });

  useEffect(() => {
    var caloriesDevidedBy = Number(foodObjectsTodaySumarized.kcal) / 2000;
    console.log();
    var suggestedIntake = 1 - caloriesDevidedBy;
    var doughnutColor = "rgb(4, 238, 4)";
    if (caloriesDevidedBy > 1) {
      caloriesDevidedBy = 1;
      suggestedIntake = 0;
      doughnutColor = "red";
    }
    setCalorieDoughnutData({
      labels: [
        "dzisiejsza podaż kalori",
        "Sugerowane dzienne zapotrzebowanie kaloryczne 2000kcal",
      ],
      datasets: [
        {
          label: "Sugerowane dzienne spożycie kalorii",
          data: [caloriesDevidedBy, suggestedIntake],
          backgroundColor: [doughnutColor, "whitesmoke"],
          borderColor: ["green", "green"],
        },
      ],
    });
  }, [foodObjectsTodaySumarized]);

  const options = {};

  return (
    <div>
      <Doughnut data={calorieDoughnutData} options={options} />
    </div>
  );
};

export default CalorieDoughnut;
