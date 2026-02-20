// Guard to protect routes that need role based authorization.
function checkedRole(role) {
  return function (req, res, next) {
    if (req.user.role && role.includes(req.user.role)) {
      return next();
    } else {
      res.status(401).json({
        errors: {
          common: {
            msg: "Sorry, Your are not authorized to access this page!",
          },
        },
      });
    }
  };
}
module.exports = checkedRole;
