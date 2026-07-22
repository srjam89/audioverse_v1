const express = require("express");
const cors = require("cors");
const imageSliderRoutes = require("./modules/image-slider/image-slider.routes");
const categoryRoutes = require("./modules/category/category.routes");
const productSearchRoutes = require("./modules/product-search/product-search.routes");
const errorHandler = require("./middleware/error-handler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Connected successfully" });
});

app.use("/api/image-slider", imageSliderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productSearchRoutes);
app.use(errorHandler);

module.exports = app;
