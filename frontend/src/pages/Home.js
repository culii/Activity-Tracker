import { useEffect, useState } from "react";

// components
import ActivityDetails from "../components/ActivityDetails";
import ActivityDoughnut from "../components/ActivityDoughnut";
import ActivityForm from "../components/ActivityForm";

const Home = () => {
  const [templates, setTemplates] = useState(null);
  const [scheduledActivities, setScheduledActivities] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities");
        const json = await response.json();

        if (response.ok) {
          // separate template from non scheduled
          const templates = json.filter((activity) => activity.isTemplate);
          const scheduled = json.filter((activity) => !activity.isTemplate);

          setTemplates(templates);
          setScheduledActivities(scheduled);
        } else {
          console.error("Failed to fetch activities:", json);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const groupByDay = (activities) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let grouped = {};
    days.forEach((day) => (grouped[day] = []));

    activities.forEach((activity) => {
      const day = days[new Date(activity.startTimeAndDate).getDay()]; // Assuming activity has a 'date' field
      if (grouped[day]) {
        grouped[day].push(activity);
      }
    });

    return grouped;
  };

  const dataByDay = scheduledActivities
    ? groupByDay(scheduledActivities)
    : null;

  // JSX Render
  return (
    <div className="home">
      <div className="templates">
        <ActivityForm />
        {templates &&
          templates.map((activity) => (
            <ActivityDetails key={activity._id} activity={activity} />
          ))}
      </div>
      <div className="chart">
        <div className="week-charts">
          {dataByDay &&
            Object.keys(dataByDay).map((day) => (
              <div key={day} className="day-chart">
                <ActivityDoughnut activitiesForDay={dataByDay[day]} day={day} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
