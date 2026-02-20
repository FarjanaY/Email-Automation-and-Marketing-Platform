//External Imports
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Internal Exports
const User = require("../models/userSchema");
const { createJsonWebToken } = require("../helper/jsonTokenCretation");
const {
  LOG_IN_SECRET_KEY,
  LOG_IN_VERIFY_TOKEN_NAME,
  FORGOT_PASS_COOKIE_NAME,
  FORGOT_PASS_SECRET_KEY,
  CLIENT_URL,
  LOGIN_REFRESH_TOKEN_SECRET_KEY,
  LOGIN_REFRESH_TOKEN_COOKIE_NAME,
} = require("../config/dotenvExports");
const sendEmailWithNodemailer = require("../helper/accountActivationEamil");
const runValidations = require("../validations/runValidations");
const { updatePassword } = require("./usersController");

/*=======Loged In=====
method: POST , 
Route : /api/login
==========================*/
const loginUser = async (req, res, next) => {
  try {
    //email and pass from req.body

    const { email, password } = req.body || {};

    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return next(
        createError(
          404,
          "User doesnot exist with this email. Please register first.",
        ),
      );
    }

    const isPassMatch = await bcrypt.compare(password, isUserExist.password);

    if (!isPassMatch) {
      return next(createError(401, "Invalid Email/Password."));
    }

    if (isUserExist.isBanned) {
      return next(
        createError(403, "You are banned. Please contact authority."),
      );
    }

    const tokenData = {
      email,
      userId: isUserExist?.id,
      role: isUserExist?.role,
      isAdmin: isUserExist.isAdmin,
      isBanned: isUserExist?.isBanned,
      username: isUserExist?.username,
    };
    //create access token
    const jwtLoginToken = await createJsonWebToken(
      tokenData,
      LOG_IN_SECRET_KEY,
      "15m",
    );

    //acccess token Cookie set
    res.cookie(LOG_IN_VERIFY_TOKEN_NAME, jwtLoginToken, {
      maxAge: 15 * 60 * 1000, // 15min
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    //Create Refresh token
    const refreshToken = await createJsonWebToken(
      tokenData,
      LOGIN_REFRESH_TOKEN_SECRET_KEY,
      "7d",
    );

    //Refresh token cookie set
    res.cookie(LOGIN_REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7Days
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      success: true,
      msg: "Logged in successfully",
      payload: isUserExist,
    });
  } catch (err) {
    next(err);
  }
};

/*=======Loged Out=====
method: POST , 
Route : /api/logout
==========================*/
// const logoutUser = (req, res, next) => {
//   try {
//     console.log("req.userID====", req.user);
//     const isLoggedOutToken = req.cookies[LOG_IN_VERIFY_TOKEN_NAME];
//     const isRefreshTokenExist = req.cookies[LOGIN_REFRESH_TOKEN_COOKIE_NAME];

//     if (!isLoggedOutToken && !isRefreshTokenExist) {
//       return next(createError(400, "Already Logged Out. Please login first."));
//     }

//     if (isLoggedOutToken) {
//       try {
//         const decoded = jwt.verify(isLoggedOutToken, LOG_IN_SECRET_KEY);
//         if (!decoded) {
//           return next(
//             createError(400, "Unable to verify user. Please login first."),
//           );
//         }
//       } catch (err) {
//         if (
//           err.name !== "TokenExpiredError" &&
//           err.name !== "JsonWebTokenError"
//         ) {
//           return next(err);
//         }
//       }
//     }

//     if (isLoggedOutToken) {
//       try {
//         const decodedRefreshTokenUser = jwt.verify(
//           isRefreshTokenExist,
//           LOGIN_REFRESH_TOKEN_SECRET_KEY,
//         );
//         if (!decodedRefreshTokenUser) {
//           return next(
//             createError(400, "Unable to verify user. Please login first."),
//           );
//         }
//       } catch (err) {
//         if (
//           err.name !== "TokenExpiredError" &&
//           err.name !== "JsonWebTokenError"
//         ) {
//           return next(err);
//         }
//       }
//     }

//     //Remove login cookie
//     res.clearCookie(LOG_IN_VERIFY_TOKEN_NAME);
//     res.clearCookie(LOGIN_REFRESH_TOKEN_COOKIE_NAME);

//     return res.status(200).json({
//       success: true,
//       msg: "Logged out successfully",
//       payload: decoded,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
const logoutUser = (req, res, next) => {
  try {
    console.log("req.userID====", req.user);
    const isLoggedOutToken = req.cookies[LOG_IN_VERIFY_TOKEN_NAME];
    const isRefreshTokenExist = req.cookies[LOGIN_REFRESH_TOKEN_COOKIE_NAME];

    if (!isLoggedOutToken && !isRefreshTokenExist) {
      return next(createError(400, "Already Logged Out. Please login first."));
    }

    //Remove login cookie
    res.clearCookie(LOG_IN_VERIFY_TOKEN_NAME);
    res.clearCookie(LOGIN_REFRESH_TOKEN_COOKIE_NAME);

    return res.status(200).json({
      success: true,
      msg: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};

/*=======forgot User Password=====
method: POST , 
Route : /api/forgot-pass
==========================*/
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    //Check email is valid or not
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(
        createError(
          404,
          "Invalid user. Please check your email or register first.",
        ),
      );
    }

    const tokenData = { email, userId: validUser?._id };
    //CREATE JWT Token
    const forgotPassJWT = await createJsonWebToken(
      tokenData,
      FORGOT_PASS_SECRET_KEY,
      "10m",
    );

    //pepare email
    const emailData = {
      email,
      subject: "Reset Your Account Password",
      html: `
      <h2>Hello ${validUser?.name}</h2>
      <p>Please click here to 
        <a href="${CLIENT_URL}/api/users/activate/${forgotPassJWT}" target="_blank">
        reset
        </a> your account password.
      </p>
      `,
    };

    try {
      //await sendEmailWithNodemailer(emailData);
    } catch (err) {
      return next(createError(500, "Failed to send password resetting email."));
    }

    res.cookie(FORGOT_PASS_COOKIE_NAME, forgotPassJWT, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      // signed: true,
    });

    return res.status(200).json({
      success: true,
      msg: `Please check your ${email} for updating new password.`,
      payload: forgotPassJWT,
    });
  } catch (err) {
    console.log("Catch error-----");
    console.log(err.message);
    console.log("Catch error-----");
    return next(err);
  }
};

/*=======reset User Password=====
method: PUT , 
Route : /api/reset-pass
==========================*/
const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const isTokenExist = req.cookies[FORGOT_PASS_COOKIE_NAME];
    if (!isTokenExist) {
      return next(createError(400, "Token not found. Please try again."));
    }

    try {
      const decoded = jwt.verify(isTokenExist, FORGOT_PASS_SECRET_KEY);
      if (!decoded) {
        return next(createError(400, "Unable to verify user. "));
      }

      const isUserExist = await User.findById({ _id: decoded?.userId }).select(
        "-password",
      );
      if (!isUserExist) {
        return next(createError(404, "No such user found."));
      }

      const hashedResetPass = await bcrypt.hash(password, 10);
      const updatedPassword = await User.findByIdAndUpdate(
        decoded.userId,
        {
          $set: { password: hashedResetPass },
        },
        { new: true, runValidations: true, context: "query" },
      ).select("-password");

      if (!updatedPassword) {
        return next(
          createError(
            404,
            "Resetting password is unsuccessful, please try again.",
          ),
        );
      }

      //Remove reset password cookie
      res.clearCookie(FORGOT_PASS_COOKIE_NAME);

      return res.status(200).json({
        success: true,
        msg: `Your password has been updated.`,
        payload: updatedPassword,
      });
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    console.log("Catch error-----");
    console.log(err.message);
    console.log("Catch error-----");
    return next(err);
  }
};

/*=======reset User Password=====
method: GET , 
Route : /api/reset-pass
==========================*/
const refreshTokeGenerate = async (req, res, next) => {
  try {
    const isRefreshToken = req.cookies[LOGIN_REFRESH_TOKEN_COOKIE_NAME];
    console.log(isRefreshToken);
    if (!isRefreshToken) {
      return next(
        createError(401, "Refresh token is expired. Please login again."),
      );
    }

    const isAccessToken = req.cookies[LOG_IN_VERIFY_TOKEN_NAME];

    if (isAccessToken) {
      try {
        const accessTokenDecoded = jwt.verify(isAccessToken, LOG_IN_SECRET_KEY);
        if (accessTokenDecoded) {
          return next();
        }
      } catch (err) {
        if (err.name !== "TokenExpiredError") {
          return next(err);
        }
      }
    }
    try {
      const decoded = jwt.verify(
        isRefreshToken,
        LOGIN_REFRESH_TOKEN_SECRET_KEY,
      );
      if (!decoded) {
        return next(createError(404, "Unable to verify user."));
      }

      const isUserExist = await User.findById({ _id: decoded?.userId }).select(
        "-password",
      );
      if (!isUserExist) {
        return next(createError(404, "No such user found."));
      }

      const tokenData = {
        email: isUserExist?.email,
        userId: isUserExist?.id,
        role: isUserExist?.role,
        isAdmin: isUserExist.isAdmin,
        isBanned: isUserExist?.isBanned,
        username: isUserExist?.username,
      };
      //create access token
      const jwtLoginToken = await createJsonWebToken(
        tokenData,
        LOG_IN_SECRET_KEY,
        "15m",
      );

      //acccess token Cookie set
      res.cookie(LOG_IN_VERIFY_TOKEN_NAME, jwtLoginToken, {
        maxAge: 15 * 60 * 1000, // 15min
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });

      return res.status(200).json({
        success: true,
        msg: `Generated new accress token.`,
        payload: { isUserExist },
      });

      //return next()
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    console.log(err.message);
    return next(err);
  }
};

module.exports = {
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  refreshTokeGenerate,
};

// ✅ Axios Interceptor (Auto Refresh)
// axios.interceptors.response.use(
//   res => res,
//   async err => {
//     if (err.response.status === 401) {
//       await axios.post("/api/refresh-token", {}, { withCredentials: true });
//       return axios(err.config);
//     }
//     return Promise.reject(err);
//   }
// );
