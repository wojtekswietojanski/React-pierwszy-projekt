import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const NutritionsDistribution = ({ foodObjectsDaysInMonth }) => {
  const [NutritionsDistributionData, setCalorieNutritionsDistribution] =
    useState({
      labels: ["białko", "węglowodany", "tłuszcze"],
      datasets: [
        {
          label: "rozkład makroskładników w diecie",
          data: [10, 10, 10],
          backgroundColor: ["rgb(0,0,0,0)", "rgb(0,0,0,0)", "rgb(0,0,0,0)"],
          borderColor: ["green", "green", "green"],
        },
      ],
    });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    var container = [0, 0, 0];
    foodObjectsDaysInMonth.map((DayInMonth) => {
      container[0] += DayInMonth.proteins;
      container[1] += DayInMonth.carbs;
      container[2] += DayInMonth.fats;
    });
    if (container[0] == 0 && container[1] == 0 && container[2] == 0) {
      container[0] = 1;
      container[1] = 1;
      container[2] = 1;
    }
    setCalorieNutritionsDistribution({
      labels: ["białko", "węglowodany", "tłuszcze"],
      datasets: [
        {
          label: "rozkład makroskładników w diecie",
          data: [container[0], container[1], container[2]],
          backgroundColor: [
            "rgb(4, 238, 4)",
            "rgb(4, 160, 4)",
            "rgb(4, 100, 4)",
          ],
          borderColor: ["green", "green", "green"],
        },
      ],
    });
  }, [foodObjectsDaysInMonth, windowWidth]);

  const options = {
    legend: {
      display: false,
    },
  };

  return (
    <div>
      <Pie data={NutritionsDistributionData} options={options} />
    </div>
  );
};

export default NutritionsDistribution;
