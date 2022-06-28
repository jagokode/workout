import { useState, useEffect } from "react";
import axios from "axios";
import Workout from "../components/Workout";
import Form from "../components/Form";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/workout");
      if (response.statusText === "OK") {
        setWorkouts(response.data.data);
      }
    } catch (error) {
      console.log("Message:", error.message, "Response:", error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts !== null ? (
          workouts.map((wo) => <Workout key={wo._id} workout={wo} />)
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
