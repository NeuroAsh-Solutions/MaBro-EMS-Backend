const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const verifyToken = require("../auth/authMiddleware");
const authorizeRole = require("../auth/authRoleMiddleware");

router.get("/me", verifyToken, authorizeRole(["admin", "student"]), studentController.getStudentByUId);

module.exports = router;

