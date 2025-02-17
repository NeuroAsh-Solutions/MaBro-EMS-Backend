const authService = require("./authService");

const authorizeRole = (allowedRoles) => {
    return async (req, res, next) => {
        const uid = req.user.uid; // User is already authenticated
        const userRole = await authService.getUserRole(uid);

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Access denied: Insufficient permissions" });
        }

        next();
    };
};

module.exports = authorizeRole;
