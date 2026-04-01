const express = require("express");
const cors = require("cors");
const path = require("path");

const canvaRoutes = require("./routes/canvaRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve frontend
app.use("/frontend", express.static(path.join(__dirname, "../frontend")));

// Canva routes (clean base path)
app.use("/", canvaRoutes);

// Health check (VERY useful for Render)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

module.exports = app;