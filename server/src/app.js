const express = require("express");
const cors = require("cors");

const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS connected_at");
    res.json({
      message: "Database connected successfully",
      connectedAt: result.rows[0].connected_at,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "Connected successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
