const Workout = ({ workout }) => {
  const date = workout.createdAt;
  return (
    <div className="workout-details">
      <h3>{workout.title}</h3>
      <p>
        <strong>Beban (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Pengulangan: </strong>
        {workout.reps}
      </p>
      <p>{date.toLocaleString()}</p>
    </div>
  );
};

export default Workout;
