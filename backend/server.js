// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const dataRoutes = require("./routes/dataRoutes");
const zkProofRoutes = require("./routes/zkProofRoutes.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/zk", zkProofRoutes);

// Sample Health Check
app.get("/", (req, res) => {
  res.json({ message: "Healthcare DApp Backend is running." });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
