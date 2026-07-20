const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Connected successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
