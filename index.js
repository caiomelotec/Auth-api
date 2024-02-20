const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const UserModel = require("./models/User");
const userRoutes = require("./routes/UserRoutes");
const authRoutes = require("./routes/AuthRoutes");
const languageRoutes = require("./routes/LanguageRoutes");
mongoose
  .connect("mongodb://localhost:27017/auth")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/auth",
  collection: "sessions",
  expires: 12 * 60 * 60 * 1000,
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// app.use()

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Working...");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/language", languageRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
