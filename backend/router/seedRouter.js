//External Imports
const express = require("express");

//Internal Imports
const seedUsers = require("../controller/seedControllers");
const { profileImageFolder } = require("../helper/deleteImage");

const seedRouter = express.Router();

//route /api/seed/
seedRouter.get("/users", profileImageFolder, seedUsers);

module.exports = seedRouter;
