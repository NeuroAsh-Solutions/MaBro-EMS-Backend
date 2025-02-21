const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();

app.use(cors());
app.use(bodyParser.json());

console.log("Starting the server...");

// Import Routes
const studentRoutes = require("./routes/studentRoutes"); 
const authRoutes = require("./auth/authRoutes");
// Check if this file exists
app.use("/students", studentRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
