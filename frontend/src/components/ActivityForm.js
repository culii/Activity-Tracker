import { useState } from "react";
import { useActivitiesContext } from "../hooks/useActivitiesContext";
import "react-datepicker/dist/react-datepicker.css";

const ActivityForm = () => {
  const { dispatch } = useActivitiesContext();
  const [activityName, setActivityName] = useState("");
  const [duration, setDuration] = useState("");
  const [startTimeAndDate, setStartTimeAndDate] = useState("");
  const [colour, setColour] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const activity = { activityName, duration, startTimeAndDate, colour };

      const response = await fetch("/api/activities", {
        method: "POST",
        body: JSON.stringify(activity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.ok && json.success) {
        setError(null);
        setActivityName("");
        setDuration("");
        setStartTimeAndDate("");
        setColour("");
        console.log("Returned activity data:", json.data);
        dispatch({
          type: "TEMPLATE_ADDED",
          payload: {
            templateActivity: json.data.templateActivity,
          },
        });

        dispatch({
          type: "SCHEDULED_ACTIVITY_ADDED",
          payload: {
            scheduledActivity: json.data.scheduledActivity,
          },
        });
      } else {
        setError(json.message || "Failed to save activity.");
        console.error("Failed to save activity:", json);
      }
    } catch (error) {
      setError("Failed to save activity. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create Activity</h3>

      <label>What did you do ?</label>
      <input
        type="text"
        onChange={(e) => setActivityName(e.target.value)}
        value={activityName}
      />

      <label>When ?</label>
      <input
        type="date"
        onChange={(e) => setStartTimeAndDate(e.target.value)}
        value={startTimeAndDate}
      />

      <label>For how long ?</label>
      <input
        type="number"
        onChange={(e) => setDuration(e.target.value)}
        value={duration}
      />

      <label>Colour</label>
      <input
        type="color"
        onChange={(e) => setColour(e.target.value)}
        value={colour}
      />
      <button>Save</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ActivityForm;
