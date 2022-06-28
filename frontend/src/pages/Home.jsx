import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import axios from "axios";
import Workout from "../components/Workout";
import Form from "../components/Form";

const Home = () => {
  const { workout, dispatch } = useWorkoutContext();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/workout");
      dispatch({ type: "SET_WORKOUT", payload: response.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workout !== null ? (
          workout.map((wo) => <Workout key={wo._id} workout={wo} />)
        ) : (
          <div>
            <h3>Workouts is empty</h3>
          </div>
        )}
      </div>
      <Form />
    </div>
  );
};

export default Home;
