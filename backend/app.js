//external imports
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
const multer = require("multer");

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const usersRouter = require("./router/usersRouter");
const { loginUser } = require("./controller/loginController");
const loginRouter = require("./router/loginRouter");
const seedRouter = require("./router/seedRouter");
const smtpSignupRouter = require("./router/smtpSignUpRouter");

//inetrnal imports

//App create
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 100 requests per IP
  message: "Too many requests, please try again later.",
});

//default routing
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
//app.use(limiter);

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Static path
//app.use("/public", express.static(path.join(__dirname, "/public")));
app.use("/uploads", express.static(path.join(__dirname, "/public/uploads")));

//Routing setup
app.use("/api", loginRouter);
app.use("/api/seed", seedRouter);
app.use("/api/users", usersRouter);
app.use("/api/admin", smtpSignupRouter);

//404 not found handler
app.use(notFoundHandler);

//deafult error handler
app.use(errorHandler);

module.exports = app;
