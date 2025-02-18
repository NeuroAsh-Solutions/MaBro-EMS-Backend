const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
// const verifyToken = require("../auth/authMiddleware");
// const authorizeRole = require("../auth/authRoleMiddleware");

// Remove this test route since it conflicts with getAllStudents
// router.get('/', (req, res) => {
//     res.json({ message: 'Student routes working!' });
// });

// Actual routes
router.post("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;

