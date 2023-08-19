import { useState } from "react";

const ActivityForm = () => {
  const [activityName, setActivityName] = useState("");
  const [duration, setDuration] = useState("");
  const [startTimeAndDate, setStartTimeAndDate] = useState("");
  const [colour, setColour] = useState("");
  const [error, setError] = useState("null");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const activity = { activityName, duration, startTimeAndDate, colour };

    const response = await fetch("/api/activities", {
      method: "POST",
      body: JSON.stringify(activity),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setActivityName("");
      setDuration("");
      setStartTimeAndDate("");
      setError(null);
      console.log("new workout added", json);
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
