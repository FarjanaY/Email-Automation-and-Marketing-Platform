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

      // return res.status(200).json({
      //   success: true,
      //   msg: `Generated new accress token.`,
      //   payload: { isUserExist },
      // });

      return next();
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    console.log(err.message);
    return next(err);
  }
};
module.exports = refreshTokeGenerate;
