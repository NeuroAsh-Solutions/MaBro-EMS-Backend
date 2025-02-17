const admin = require("../config/firebaseAdmin");

const verifyToken = async (req, res, next) =>
{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
    {
        return res.status(401).json({
            message: "Unauthorized! No token provided"
        });
    }

    const idToken = authHeader.split(" ")[1];

    try
    {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error)
    {
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = verifyToken;