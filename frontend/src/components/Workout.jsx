import axios from "axios";
import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Workout = ({ workout }) => {
  const [error, setError] = useState(null);
  const date = new Date(workout.createdAt);
  // const timestamp = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
  const { dispatch } = useWorkoutContext();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/workout/${workout._id}`
      );

      // console.log(response);

      dispatch({ type: "DELETE_WORKOUT", payload: response.data.data });
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };
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
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      {/* <p>{timestamp}</p> */}
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Workout;
