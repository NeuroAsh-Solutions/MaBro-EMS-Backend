const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "Access denied: Role information missing" });
      }
      
      const userRole = req.user.role;
      
      if (Array.isArray(allowedRoles) && !allowedRoles.includes(userRole)) {
        return res.status(403).json({ 
          message: `Access denied: ${userRole} role is not authorized for this resource` 
        });
      }
  
      next(); 
    };
  };
  
  module.exports = authorizeRole;
  