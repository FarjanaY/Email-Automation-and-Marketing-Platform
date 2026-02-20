const { validationResult } = require("express-validator");
const path = require("path");
const deleteImage = require("../helper/deleteImage");

const runValidations = async (req, res, next) => {
  const errors = validationResult(req);

  //array of errors are converted to object.
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    return next();
  } else {
    //Removing uploaded file.
    try {
      if (req?.files && req?.files?.length > 0) {
        const folder = req?.imageFolder || "others";
        if (req?.files?.length > 1) {
          //deleting multiple files
          for (const file of req.files) {
            await deleteImage(folder, file.filename);
          }
        } else {
          const filename = req.files[0]?.filename;
          await deleteImage(folder, filename);
        }
      }
    } catch (err) {
      console.error("Validation Error! Couldnot deleted images.");
      console.log(err.message);
      console.log(err);
      return next(err);
    }

    return res.status(400).json({
      errors: {
        validationErr: {
          success: false,
          msg: "Validation error!",
          error: mappedErrors,
          usernameSuggestions: req.usernameSuggestions || [],
        },
      },
    });
  }
};

module.exports = runValidations;
