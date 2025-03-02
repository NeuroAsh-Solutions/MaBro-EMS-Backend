const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const verifyToken = require("../auth/authMiddleware");
const authorizeRole = require("../auth/authRoleMiddleware");

// Get all students route
router.get("/", verifyToken, studentController.getAllStudents);

// Add missing routes
router.get("/:id", verifyToken, studentController.getStudentById);
router.post("/", verifyToken, studentController.createStudent);
router.put("/:id", verifyToken, studentController.updateStudent);
router.delete("/:id", verifyToken, studentController.deleteStudent);

module.exports = router;

