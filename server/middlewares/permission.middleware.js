const checkUserType = (allowedTypes) => {
  return function (req, res, next) {
    const userType = req.user.type;
    if (allowedTypes.includes(userType)) {
      next();
    } else {
      res
        .status(403)
        .json({ error: "You do not have permission to perform this action." });
    }
  };
};

export { checkUserType };
