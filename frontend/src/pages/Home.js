import { useEffect, useState } from "react";

// components
import ActivityDetails from "../components/ActivityDetails";

const Home = () => {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch("/api/activities");
      const json = await response.json();

      if (response.ok) {
        setActivities(json);
      }
    };
    fetchActivities();
  }, []);
  return (
    <div className="home">
      <div className="activities">
        {activities &&
          activities.map((activity) => (
            <ActivityDetails key={activity._id} activity={activity} />
          ))}
      </div>
    </div>
  );
};

export default Home;
