//External imports
const createError = require("http-errors");
const path = require("path");
const bcrypt = require("bcryptjs")

//internal imports
const User = require("../models/userSchema");
const data = require("../utilities/data");
const { deleteAllImagesExceptDefault } = require("../helper/deleteImage");

const seedUsers = async (req, res, next) => {
  try {
    //Deleting all existing users
    await User.deleteMany({});

    //Delete all images form uploads/avatar folder
    const foldername = req.imageFolder;
    const imageFolderPath = path.join(
      __dirname,
      `/../public/uploads/${foldername}`,
    );
    const isAllImageRemove =
      await deleteAllImagesExceptDefault(imageFolderPath);
    if (!isAllImageRemove) {
      return next(createError(404, "Error! Images couldnot be removed."));
    }

    //All password hashed before inserting and avoid double hashing.
    const hashedUsers = await Promise.all(
      data?.users.map(async (user) => {
        let password = user.password;

        if (!password.startsWith("$2")) {
          password = await bcrypt.hash(password, 10);
        }

        return {
          ...user,
          password,
        };
      }),
    );

    //adding seed users to database
    const addSeedUsers = await User.insertMany(hashedUsers);

    if (!addSeedUsers) {
      return next(createError(404, "Could not add seed users to database"));
    }

    //Removing password and some other information
    const seedUsers = addSeedUsers?.map((user) => {
      const obj = user?.toObject();
      delete obj?.password;
      delete obj?.isBanned;
      return obj;
    });

    res.status(201).json({
      success: true,
      message: "Seed users added successfully.",
      payload: seedUsers,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = seedUsers;
