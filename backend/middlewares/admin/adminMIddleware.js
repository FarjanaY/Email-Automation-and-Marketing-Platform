//External Imports
const createError = require("http-errors");

//Internal Imports
const User = require("../../models/userSchema");

const isAdmin = async (req, res, next) => {
  try {
    
  } catch (err) {
    console.error("Error! Admin Access Check =", err.message);
    console.error(err);
    return next(err);
  }
};

const isBanned = async (req, res, next) => {
  try {
  } catch (err) {
    console.error("Error! Admin Access Check =", err.message);
    console.error(err);
    return next(err);
  }
};
module.exports = { isAdmin, isBanned };
