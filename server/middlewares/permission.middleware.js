const checkUserType = (allowedTypes) => {
  return function (req, res, next) {
    const userType = req.user.type;
    console.log("🐬 ~ userType:", userType);
    if (allowedTypes.includes(userType)) {
      next();
    } else {
      res.status(403).json({
        error: `${userType} does not have permission to perform this action. Only ${allowedTypes} user is allowed.`,
      });
    }
  };
};

export { checkUserType };
