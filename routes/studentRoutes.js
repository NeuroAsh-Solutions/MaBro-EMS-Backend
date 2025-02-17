const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const verifyToken = require("../auth/authMiddleware");
const authorizeRole = require("../auth/authRoleMiddleware");

// router.get("/", verifyToken, authorizeRole(['student']), stutdentController.getAllStudents);
// router.post("/", verifyToken, authorizeRole(["student"]), studentController.addStudent);
//
// module.exports = router;