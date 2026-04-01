const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session"); // ➕ ADD THIS

const canvaRoutes = require("./routes/canvaRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ➕ ADD THIS (VERY IMPORTANT)
app.use(
  session({
    secret: "canva_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Serve frontend
app.use("/frontend", express.static(path.join(__dirname, "../frontend")));

// Canva routes
app.use("/", canvaRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

module.exports = app;