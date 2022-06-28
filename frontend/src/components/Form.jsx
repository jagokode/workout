import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/workout", {
        title,
        load,
        reps,
      });
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>Tambah Latihan Baru</h3>
      <label>Judul Latihan</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Beban (kg):</label>
      <input
        type="text"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />

      <label>Pengulangan:</label>
      <input
        type="text"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <button>Tambah Latihan</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Form;
