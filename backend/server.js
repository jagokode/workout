require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutsRoute");
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
// middleware for logging
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// route
app.use("/api/workout", workoutRoutes);

// DB
const start = async () => {
  try {
    const connectDb = await mongoose.connect(process.env.MONGO_LOCAL);
    console.log("Connected to Database");

    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log("Fail to connect to Database...");
    console.log(error);
  }
};

start();
