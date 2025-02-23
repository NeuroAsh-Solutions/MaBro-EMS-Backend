const admin = require("../config/firebaseAdmin");

// Create User & Assign Role
exports.createUser = async (email, password, displayName, role = "student") => {
    const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName,
    });

    // Assign Role as Custom Claim
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });

    return { uid: userRecord.uid, email, displayName, role };
};

// Get User Role from Token
exports.getUserRole = async (uid) => {
    const user = await admin.auth().getUser(uid);
    return user.customClaims?.role || "student"; // Default to student if no role found
};
