const { db } = require("../config/firebaseAdmin");
const SubscriptionModel = require("../models/SubscriptionModel");
const SubscriptionPlans = require("../constants/subscriptionPlans");

// ✅ Assign a subscription to a student (Only authenticated users)
exports.assignSubscription = async (req, res) => {
    const { studentSubscriptionPlan } = req.body;

    // Extract student info from token (set by authMiddleware)
    const studentId = req.user.uid;
    const studentEmail = req.user.email;
    const studentFirstName = req.user.firstName;
    const studentLastName = req.user.lastName;
    const studentPhoneNumber = req.user.phoneNumber;
    const studentParentPhoneNumber = req.user.parentPhoneNumber;

    if (!Object.values(SubscriptionPlans).includes(studentSubscriptionPlan)) {
        return res.status(400).json({ error: "Invalid subscription plan" });
    }

    try {
        const newSubscription = new SubscriptionModel(
            studentId,
            studentFirstName,
            studentLastName,
            studentEmail,
            studentPhoneNumber,
            studentParentPhoneNumber,
            studentSubscriptionPlan
        );

        await db.collection("subscriptions").doc(studentId).set(newSubscription);

        res.status(201).json({ message: "Subscription assigned successfully", subscription: newSubscription });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentSubscription = async (req, res) => {
    const studentId = req.user.uid;

    try {
        const subscriptionDoc = await db.collection("subscriptions").doc(studentId).get();

        if (!subscriptionDoc.exists) {
            return res.status(404).json({ error: "No subscription found" });
        }

        res.status(200).json(subscriptionDoc.data());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllSubscriptions = async (req, res) => {
    try {
        const subscriptionsSnapshot = await db.collection("subscriptions").get();
        const subscriptions = subscriptionsSnapshot.docs.map(doc => doc.data());

        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
