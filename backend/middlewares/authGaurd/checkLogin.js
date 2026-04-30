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
    return next(createError(401, "Please login."));
  }

  try {
    //User verify using jwt.
    const decoded = jwt.verify(isToken, LOG_IN_SECRET_KEY);
    if (!decoded) {
      return next(createError(400, "Invalid or expired token."));
    }

    req.user = decoded;
    return next();
  } catch (err) {
    return next(err);
  }
};

const checkLoginController = (req, res, next) => {
  try {
    if(req.user){
      return res.status(200).json({
        success: true,
        msg: "User authenticated",
        payload: req.user,
      });
    }
    const token = req.cookies[LOG_IN_VERIFY_TOKEN_NAME];

    if (!token) {
      return next(createError(401, "Please login."));
    }

    const decoded = jwt.verify(token, LOG_IN_SECRET_KEY);
    if (!decoded) {
      return next(createError(400, "Invalid or expired token."));
    }

    //req.user = decoded;
    return res.status(200).json({
      success: true,
      msg: "User authenticated",
      payload: decoded,
    });
  } catch (err) {
    return next(err);
  }
};

const checkLogout = (req, res, next) => {
  try {
    const isLoggedInTokenExist = req.cookies[LOG_IN_VERIFY_TOKEN_NAME];
    const isRefreshTokenExist = req.cookies[LOGIN_REFRESH_TOKEN_COOKIE_NAME];
    let isLoggedIn = false;

    if (isLoggedInTokenExist) {
      try {
        const decoded = jwt.verify(isLoggedInTokenExist, LOG_IN_SECRET_KEY);
        if (decoded) {
          if (isRefreshTokenExist) {
            isLoggedIn = true;
          }
        }
      } catch (err) {
        res.clearCookie(LOG_IN_VERIFY_TOKEN_NAME);
        return next(err);
      }
    }

    if (isRefreshTokenExist) {
      try {
        const decodeRefreshData = jwt.verify(
          isRefreshTokenExist,
          LOGIN_REFRESH_TOKEN_SECRET_KEY,
        );
        if (decodeRefreshData) {
          isLoggedIn = true;
        }
      } catch (err) {
        //res.clearCookie(LOGIN_REFRESH_TOKEN_COOKIE_NAME);
        return next(err);
      }
    }

    if (isLoggedIn) {
      return next(createError(400, "Already logged in. "));
    }
    return next();
  } catch (err) {
    return next(err);
  }
};
//console.log(typeof checkLogin, typeof checkLogout);

module.exports = { checkLogin, checkLogout, checkLoginController };
