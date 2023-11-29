import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import React, { useEffect, useState } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ foodObjectsDaysInMonth }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "białko w tym miesiącu",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "węglowodany w tym miesiącu",
        data: [],
        backgroundColor: "rgba(255, 205, 86, 0.4)",
        borderColor: "rgba(255, 205, 86, 1)",
        pointBorderColor: "rgba(255, 205, 86, 1)",
      },
      {
        label: "tłuszcze w tym miesiącu",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.4)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  });

  useEffect(() => {
    var labels = foodObjectsDaysInMonth.map((item) => item.day);
    var proteinData = foodObjectsDaysInMonth.map((item) => item.proteins);
    var carbsData = foodObjectsDaysInMonth.map((item) => item.carbs);
    var fatsData = foodObjectsDaysInMonth.map((item) => item.fats);
    if (labels.length == 0) {
      labels = [0, 1];
      proteinData = [0, 0];
      carbsData = [0, 0];
      fatsData = [0, 0];
    }
    setData({
      ...data,
      labels: labels,
      datasets: [
        {
          ...data.datasets[0],
          data: proteinData,
        },
        {
          ...data.datasets[1],
          data: carbsData,
        },
        {
          ...data.datasets[2],
          data: fatsData,
        },
      ],
    });
  }, [foodObjectsDaysInMonth]);

  const options = {
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
