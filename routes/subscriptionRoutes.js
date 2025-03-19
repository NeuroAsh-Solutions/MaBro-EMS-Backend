const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const verifyToken = require("../auth/authMiddleware");
const authorizeRole = require("../auth/authRoleMiddleware");

router.post("/assign", verifyToken, authorizeRole(["admin", "student"]), subscriptionController.assignSubscription);

router.get("/me", verifyToken, subscriptionController.getStudentSubscription);

router.get("/all", verifyToken, authorizeRole(["admin"]), subscriptionController.getAllSubscriptions);

module.exports = router;
