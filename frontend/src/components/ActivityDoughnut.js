import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  DoughnutController,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";

Chart.register(DoughnutController, ArcElement, CategoryScale, Tooltip, Legend);

// formatDate function
function formatDate(isoString) {
  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString(undefined, options);
}

const ActivityDoughnut = ({ activitiesForDay, day }) => {
  const data = {
    labels: activitiesForDay.map((activity) => activity.activityName),
    datasets: [
      {
        data: activitiesForDay.map((activity) => activity.duration),
        backgroundColor: activitiesForDay.map((activity) => activity.colour),
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          // This will be triggered for each item in the tooltip
          label: function (context) {
            // Extract the label, value, and the dataset from the context
            const label = context.label;
            const value = context.parsed;

            // Find the associated activity using the label (activityName)
            const activity = activitiesForDay.find(
              (act) => act.activityName === label
            );

            // Convert startTimeAndDate to a more readable format
            const readableDate = formatDate(activity.startTimeAndDate);

            // Return the string that you want to show in the tooltip
            return `${readableDate}: for ${value} mins`;
          },
        },
      },
    },
  };

  return (
    <div className="activity-doughnut-container">
      <h2>{day}</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ActivityDoughnut;
