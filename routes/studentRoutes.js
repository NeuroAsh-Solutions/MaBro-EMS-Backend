const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const verifyToken = require("../auth/authMiddleware");
const authorizeRole = require("../auth/authRoleMiddleware");

router.get("/", verifyToken, studentController.getAllStudents);
router.get("/:id", verifyToken, studentController.getStudentById);
router.post("/", verifyToken, authorizeRole(["admin"]), studentController.createStudent);
router.put("/:id", verifyToken, authorizeRole(["admin", "teacher"]), studentController.updateStudent);
router.delete("/:id", verifyToken, authorizeRole(["admin"]), studentController.deleteStudent);
router.get("/email/:email", verifyToken, authorizeRole(["admin"]), studentController.getStudentByEmail);

module.exports = router;

