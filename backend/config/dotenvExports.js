//external imports
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL;
const SIGN_UP_SECRET_KEY =
  process.env.JWT_SECRET_KEY_SIGN_UP || "dnfgjyrwefgbdchy";
const LOG_IN_SECRET_KEY =
  process.env.JWT_SECRET_KEY_LOG_IN || "wqadscdgthryjnh";
const SMTP_USERNAME =
  process.env.SMTP_USERNAME || "farjanaa.yyeasmin@gmail.com";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const SIGN_UP_VERIFY_TOKEN_NAME =
  process.env.SIGN_UP_VERIFY_TOKEN_NAME || "signup_verify_token";
const LOG_IN_VERIFY_TOKEN_NAME =
  process.env.LOG_IN_VERIFY_TOKEN_NAME || "login_verify_cookie_token";
const FORGOT_PASS_SECRET_KEY =
  process.env.FORGOT_PASS_SECRET_KEY || "forgot_password_secret_key";
const FORGOT_PASS_COOKIE_NAME =
  process.env.FORGOT_PASS_COOKIE_NAME || "forgot_password_cookie";
const LOGIN_REFRESH_TOKEN_COOKIE_NAME =
  process.env.LOGIN_REFRESH_TOKEN_COOKIE_NAME || "refresh_token_cookie";
const LOGIN_REFRESH_TOKEN_SECRET_KEY =
  process.env.LOGIN_REFRESH_TOKEN_SECRET_KEY || "refresh_token_secret_key";

module.exports = {
  PORT,
  MONGODB_URL,
  SIGN_UP_SECRET_KEY,
  LOG_IN_SECRET_KEY,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  CLIENT_URL,
  SIGN_UP_VERIFY_TOKEN_NAME,
  LOG_IN_VERIFY_TOKEN_NAME,
  FORGOT_PASS_SECRET_KEY,
  FORGOT_PASS_COOKIE_NAME,
  LOGIN_REFRESH_TOKEN_COOKIE_NAME,
  LOGIN_REFRESH_TOKEN_SECRET_KEY,
};
