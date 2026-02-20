//External imports
const fs = require("fs/promises");
//const fsSync = require("fs");
const path = require("path");

//Internal imports

const deleteImage = async (foldername, filename) => {
  try {
    // Do not delete default avatar
    if (!filename || filename === "defaultAvatar.png") {
      return true;
    }

    const imagePath = path.join(
      __dirname,
      `/../public/uploads/${foldername}/${filename}`
    );

    try {
      await fs.access(imagePath);
    } catch {
      console.log("Image does not exist ");
      return true;
    }

    await fs.unlink(imagePath);
    console.log("Image was deleted successfully.");
    return true;
  } catch (err) {
    console.error("Couldnot delete the image.");
    throw err;
  }
};

const deleteAllImagesExceptDefault = async (foldername) => {
  try {
    //Check the file or folder is accessable or not?
    try {
      await fs.access(foldername);
    } catch (err) {
      console.error("Image Folder does not exist.");
      return true;
    }

    const files = await fs.readdir(foldername);

    for (let oneFile of files) {
      if (oneFile !== "defaultAvatar.png") {
        await fs.unlink(path.join(foldername, oneFile));
      }
    }
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("Folder doesnot exist, skipping image cleanup.");
      return true;
    }
    console.error(err);
    throw err;
  }
};

//Controller for image folder.
const profileImageFolder = (req, res, next) => {
  req.imageFolder = "avatar"; // dynamic folder name
  next();
};

module.exports = {
  deleteImage,
  deleteAllImagesExceptDefault,
  profileImageFolder,
};

// 4. How to set dynamic folder (important)

// Inside route:

// (req, res, next) => {
//   req.imageFolder = "posts";  // dynamic folder name
//   next();
// }

// router.post(
//   "/create-post",
//   upload.array("images", 5),   // ✅ multiple images

//   (req, res, next) => {
//     req.imageFolder = "posts"; // ✅ dynamic folder name
//     next();
//   },

//   postValidators,
//   runValidations,
//   postController
// );
