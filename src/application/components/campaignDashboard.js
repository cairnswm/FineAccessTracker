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

ChartJS.register(BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const CampaignDashboard = ({ campaignId }) => {
  const { campaignClicksData } = useCampaigns();

  const data = {
    labels: campaignClicksData.map((entry) => entry.date),
    datasets: [
      {
        label: "Clicks",
        data: campaignClicksData.map((entry) => entry.clicks),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

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
