const ActivityTemplateDetails = ({ activity }) => {
  return (
    <div
      className="activity-details"
      style={{ backgroundColor: activity.colour }}
    >
      <h4>{activity.activityName}</h4>
      <p>
        <strong>Duration (mins): </strong>
        {activity.duration}
      </p>
      <p>
        <strong>Start: </strong>
        {activity.startTimeAndDate}
      </p>
      <p>
        <strong>End: </strong>
        {activity.endTimeAndDate}
      </p>
      <p>
        <strong>Colour: </strong>
        {activity.colour}
      </p>
      <p>{activity.createdAt}</p>
    </div>
  );
};

export default ActivityTemplateDetails;
