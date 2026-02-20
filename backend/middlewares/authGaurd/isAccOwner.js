const createError = require("http-errors");
const User = require("../../models/userSchema");

const isAccOwner = async(req, res, next) => {
  try {
    const accOwnerId = req.user?.userId;
    const currentUserId = req.params?.id;
    const accOwnerEmail = req.user?.email;
    

    if(!accOwnerId || !accOwnerEmail || !currentUserId){
      return next(createError(403, "Unauthorized"))
    }

    
    const isEmailExist = await User.findById(currentUserId).select("email");
    if(!isEmailExist){
      return next(createError(404,"User not found."))
    }

    if (isEmailExist.email !== accOwnerEmail) {
      return next(
        createError(403, "Account verification failed."),
      );
    }
    

    if (accOwnerId.toString() !== currentUserId.toString()) {
      return next(
        createError(403, "You can only edit or delete your account."),
      );
    }

    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = isAccOwner;
