const express = require("express");
const mongoose = require("mongoose");
const app = express();

const UserModel = require("./models/User");
const userRoutes = require("./routes/UserRoutes");
const authRoutes = require("./routes/AuthRoutes");
mongoose
  .connect("mongodb://localhost:27017/auth")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working...");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
