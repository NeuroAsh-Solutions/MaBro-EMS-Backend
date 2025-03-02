// Load environment variables first
const config = require('./config/dotenv');
console.log("Environment variables loaded, JWT_SECRET is set:", !!config.JWT_SECRET);

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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
