//External Imports
const mongoose = require("mongoose");
const createError = require("http-errors");

const findDataById = async (
  modelName = "",
  id = null,
  search = "",
  emailFromReqBody = "",
  options = { password: 0 }
) => {
  try {
    // const adminFilter = { isAdmin: { $ne: true } };
    //const adminFilter = { $eq: [{ isAdmin: false }, { isAdmin: true }] };
    let isDataExist;

    //Remove + sign form mobile search
    const clean = (value) => {
      if (!value) return "";
      if (typeof value !== "string") return String(value).replace(/\D/g, "");
      return value.replace(/\D/g, "");
    };

    const numeric = clean(search);
    const searchFilter = {
      //   isAdmin: { $ne: true },
      $or: [
        { email: search },
        { username: search },
        { mobile: { $regex: numeric } },
      ],
    };

    if (id) {
      if (id && !mongoose.Types.ObjectId.isValid(id)) {
        throw Error(createError(400, "Invalid User ID."));
      } else {
        isDataExist = await modelName.findById(
          {
             id,
            // ...adminFilter
          },
          options
        );
      }
    } else if (search) {
      isDataExist = await modelName.findOne(searchFilter).select(options);
    } else if (emailFromReqBody) {
      isDataExist = await modelName
        .findOne({
          email: emailFromReqBody,
          // ...adminFilter
        })
        .select(options);
    } else {
      throw createError(404, "No such data found.");
    }

    if (!isDataExist) {
      throw createError(404, "No such data found.");
    }

    return isDataExist;
  } catch (err) {
    if (err instanceof mongoose.Error) {
      throw createError(400, "Database Error!.");
    }
    throw err;
  }
};

module.exports = findDataById;
