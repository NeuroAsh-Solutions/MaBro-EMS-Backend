const authService = require("./authService");

exports.signUp = async (req, res) => {
    const { email, password, displayName, role } = req.body;

    // Only allow predefined roles
    const allowedRoles = ["student", "teacher", "admin"];
    const assignedRole = allowedRoles.includes(role) ? role : "student";

    try {
        const userRecord = await authService.createUser(email, password, displayName, assignedRole);
        res.status(201).json({ message: "User created successfully", user: userRecord });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
