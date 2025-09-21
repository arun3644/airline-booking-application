// usage: permit('admin')
const permit = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;
    console.log("req.user: ", user);
    console.log("allowedRoles: ",allowedRoles);
    if (!user) {
      res.status(401);
      return next(new Error('Not authenticated'));
    }
    if (!allowedRoles.includes(user.role)) {
      res.status(403);
      return next(new Error('Forbidden: insufficient permissions'));
    }
    next();
  };
};

module.exports = { permit };
