const express = require("express");
const cors = require("cors");
const imageSliderRoutes = require("./modules/image-slider/image-slider.routes");
const errorHandler = require("./middleware/error-handler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Connected successfully" });
});

app.use("/api/image-slider", imageSliderRoutes);
app.use(errorHandler);

module.exports = app;
