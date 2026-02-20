//External Imports
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

//Interal imports
const {
  LOG_IN_VERIFY_TOKEN_NAME,
  LOG_IN_SECRET_KEY,
  LOGIN_REFRESH_TOKEN_COOKIE_NAME,
  LOGIN_REFRESH_TOKEN_SECRET_KEY,
} = require("../../config/dotenvExports");

const checkLogin = (req, res, next) => {
  //Cookie verify
  const isToken = req.cookies[LOG_IN_VERIFY_TOKEN_NAME];
  if (!isToken) {
    return next(createError(400, "Token is missing. Please, login frist."));
  }

  try {
    //User verify using jwt.
    const decoded = jwt.verify(isToken, LOG_IN_SECRET_KEY);
    if (!decoded) {
      return next(createError(400, "Unable to find user. Please login first."));
    }

    req.user = decoded;
    next();
  } catch (err) {
    return next(err);
  }
};

const checkLogout = (req, res, next) => {
  try {
    const isLoggedInTokenExist = req.cookies[LOG_IN_VERIFY_TOKEN_NAME];
    const isRefreshTokenExist = req.cookies[LOGIN_REFRESH_TOKEN_COOKIE_NAME];

    if (isLoggedInTokenExist) {
      try {
        const decoded = jwt.verify(isLoggedInTokenExist, LOG_IN_SECRET_KEY);
        if (decoded) {
          return next(createError(400, "Already logged in. "));
        }
      } catch (err) {
        return next(err);
      }
    }

    // if (isRefreshTokenExist) {
    //   try {
    //     const decodeRefreshData = jwt.verify(
    //       isRefreshTokenExist,
    //       LOGIN_REFRESH_TOKEN_SECRET_KEY,
    //     );
    //     if (decodeRefreshData) {
    //       return next(createError(400, "Already logged in. "));
    //     }
    //   } catch (err) {
    //     return next(err);
    //   }
    // }
    return next();
  } catch (err) {
    return next();
  }
};
//console.log(typeof checkLogin, typeof checkLogout);

module.exports = { checkLogin, checkLogout };
