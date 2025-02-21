const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const verifyToken = require("../auth/authMiddleware");
const authorizeRole = require("../auth/authRoleMiddleware");

router.post("/", verifyToken, authorizeRole(["student"]),studentController.getAllStudents);
router.get("/:id", verifyToken, authorizeRole(["student"]), studentController.getStudentById);
router.post("/", verifyToken, authorizeRole(["student"]), studentController.createStudent);
router.put("/:id", verifyToken, authorizeRole(["student"]), studentController.updateStudent);
router.delete("/:id", verifyToken, authorizeRole(["student"]), studentController.deleteStudent);

module.exports = router;

