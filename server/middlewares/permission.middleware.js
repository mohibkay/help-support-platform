const checkUserType = (allowedRoles) => {
  return function (req, res, next) {
    const userRole = req.user.role;

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({
        error: `${userRole} does not have permission to perform this action. Only ${allowedRoles} user is allowed.`,
      });
    }
  };
};

export { checkUserType };
