//External imports
const mongoose = require("mongoose");

//Internal Imports
const { MONGODB_URL } = require("./dotenvExports");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database connection successful.");
  } catch (err) {
    console.log("Could not connect to database.");
    console.log(err.message);
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
