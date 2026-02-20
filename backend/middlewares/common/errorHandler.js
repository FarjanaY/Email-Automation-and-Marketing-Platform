const createError = require("http-errors");
const { default: mongoose } = require("mongoose");

//404 not found handler
const notFoundHandler = (req, res, next) => {
  next(createError(404, "Your requested content was not found."));
};

//deafult error handler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err?.status || 500;
  let message = err?.message || "Internal Server Error!";

  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid ID Format.";
  }

  //jwt expired
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired.";
  }

  //JWT invalid
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid Token.";
  }

  //JWT not before error
  if (err.name === "NotBeforeError") {
    statusCode = 401;
    message = "Token is not activated yet.";
  }

  //  // Mongoose validation errors
  //   if (err instanceof mongoose.Error.ValidationError) {
  //     statusCode = 400;
  //     message = Object.values(err.errors)
  //       .map((e) => e.message)
  //       .join(", ");
  //   }

  //   // Duplicate key error
  //   if (err.code === 11000) {
  //     statusCode = 409;
  //     message = `${Object.keys(err.keyValue)[0]} already exists.`;
  //   }

  const response = {
    success: false,
    msg: message,
  };

  //Show stack only in development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(statusCode).json({
    errors: {
      common: response,
    },
  });
};
module.exports = { notFoundHandler, errorHandler };
