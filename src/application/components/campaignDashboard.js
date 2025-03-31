import React from "react";
import { useCampaigns } from "../context/CampaignContext";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const CampaignDashboard = ({ campaignId }) => {
  const { campaignClicksData } = useCampaigns();

  console.log("CLICKS", campaignClicksData);

  const reversedData = [...campaignClicksData].reverse(); // Create a reversed copy

  const data = {
    labels: reversedData.map((entry) => entry.click_date),
    datasets: [
      {
        label: "Clicks",
        data: reversedData.map((entry) => entry.unique_clicks),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  console.log("GRAPH DATA", data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          // Force whole numbers only
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
      },
    },
  };

  return (
    <div className="mb-4">
      <h2>Campaign Dashboard</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CampaignDashboard;
