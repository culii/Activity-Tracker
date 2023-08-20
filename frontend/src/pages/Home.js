import { useEffect } from "react";
import { useActivitiesContext } from "../hooks/useActivitiesContext";

// components
import ActivityTemplateDetails from "../components/ActivityTemplateDetails";
import ActivityDoughnut from "../components/ActivityDoughnut";
import ActivityForm from "../components/ActivityForm";

const Home = () => {
  const { activities, scheduledActivities, dispatch } = useActivitiesContext();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities");
        const json = await response.json();
        console.log("Server response:", json);
        if (response.ok) {
          // Directly extract scheduled and template activities from response
          const { scheduledActivities, templateActivities } = json.data;

          dispatch({
            type: "SET_ACTIVITIES",
            payload: templateActivities,
          });
          dispatch({
            type: "SET_SCHEDULED_ACTIVITIES",
            payload: scheduledActivities,
          });
        } else {
          console.error("Failed to fetch activities:", json);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, [dispatch]);

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
      const day = days[new Date(activity.startTimeAndDate).getDay()];
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
        {activities &&
          activities.map((activity) => (
            <ActivityTemplateDetails key={activity._id} activity={activity} />
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
