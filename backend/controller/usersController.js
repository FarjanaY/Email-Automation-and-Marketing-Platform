//Extrenal imports
const createError = require("http-errors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Internal imports
const User = require("../models/userSchema");
const findDataById = require("../helper/findDataByIdService");
const { deleteImage } = require("../helper/deleteImage");
const { createJsonWebToken } = require("../helper/jsonTokenCretation");
const {
  SIGN_UP_SECRET_KEY,
  CLIENT_URL,
  SIGN_UP_VERIFY_TOKEN_NAME,
} = require("../config/dotenvExports");
const sendEmailWithNodemailer = require("../helper/accountActivationEamil");

/*=======Get all users=====
method: GET , Route : /api/users/all-users
==========================*/
const getAllUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    //keeping only digits.
    //const search = rawSearch.replace(/\D/g, "");
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      // isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { mobile: { $regex: searchRegExp } },
      ],
    };

    const skipPage = (page - 1) * limit;

    const allUsers = await User.find(filter)
      .limit(limit)
      .skip(skipPage)
      .select({
        password: 0,
      });

    //Count all data also filtered data
    const count = await User.find(filter).countDocuments();
    const perPageTotalDataCount = allUsers?.length;
    const totalPage = Math.ceil(count / limit);
    const previousPage = page - 1 > 0 ? page - 1 : null;
    const nextPage = page + 1 <= totalPage ? page + 1 : null;

    if (!allUsers || allUsers?.length === 0) {
      next(createError(404, "No data available."));
    }

    return res.status(200).json({
      success: true,
      msg: "Returned all users successfully",
      totalDataCount: count,
      pagination: {
        perPageTotalDataCount,
        totalPage,
        currentPage: page,
        nextPage,
        previousPage,
      },
      payload: allUsers,
    });
  } catch (err) {
    next(err);
  }
};

/*=======Get one user=====
get one user by id or usernme or email or mobile
method: GET , 
1. Route : /api/users/one/:id for find by id 
2. Route : /api/users/one/ for find by email , saerch , or mobile
==========================*/
const getOneUser = async (req, res, next) => {
  try {
    //console.log("req.userID====", req.user.userId);
    const id = req.params?.id;
    const search = req.query?.search;
    const emailFromReqBody = req.body?.email;
    const options = { password: 0 };

    const user = await findDataById(
      User,
      id,
      search,
      emailFromReqBody,
      options,
    );

    if (!user) {
      return next(createError(400, "NO such user exist."));
    }
    console.log("================================");
    console.log("USER+++++");
    console.log(user);
    console.log("================================");
    return res.status(200).json({
      success: true,
      msg: "User was returned successfully",
      payload: user,
    });
  } catch (err) {
    if (err instanceof mongoose.Error) {
      return next(createError(400, "Database Error!."));
    }
    return next(err);
  }
};

/*=======Sign Up verification mail send=====
method: POST , 
Route : /api/users/sign-up/verify
==========================*/
const addUser = async (req, res, next) => {
  try {
    const { name, username, email, mobile, password, isAdmin, role, isBanned } =
      req.body;
    //avatar or profilepicture upload
    let avatar = "defaultAvatar.png";
    if (req.file && req.file.filename) {
      avatar = req.file.filename;
    } else if (req.files && req.files.length > 0) {
      avatar = req.files[0].filename;
    }

    console.log("IMAGE----------");
    console.log(req.file);
    console.log("IMAGE----------");

    const filter = {
      $or: [{ email: email }, { mobile: mobile }, { username: username }],
    };
    const isUserExist = await User.findOne(filter);

    if (isUserExist) {
      if (isUserExist?.email === email) {
        return next(createError(409, "Email is already registered."));
      }
      if (isUserExist?.username === username) {
        return next(createError(409, "Username is already exist."));
      }
      if (isUserExist?.mobile === mobile) {
        return next(createError(409, "Mobile number is already exist."));
      }
    }

    const tokenData = {
      name,
      username,
      email,
      password,
      mobile,
      avatar,
      isAdmin: isAdmin || false,
      isBanned: isBanned || false,
      role: role || "user",
    };

    //CREATE JWT Token
    const token = await createJsonWebToken(
      tokenData,
      SIGN_UP_SECRET_KEY,
      "10m",
    );

    //pepare email
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
      <h2>Hello ${name}</h2>
      <p>Please click here to 
        <a href="${CLIENT_URL}/api/users/activate?${token}" target="_blank">
        activate
        </a> your account.
      </p>
      `,
    };
    try {
      //await sendEmailWithNodemailer(emailData);
    } catch (err) {
      return next(createError(500, "Failed to send varification email."));
    }

    res.cookie(SIGN_UP_VERIFY_TOKEN_NAME, token, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
      // signed: true,
    });

    return res.status(200).json({
      success: true,
      msg: `Please check your ${email} for completing varification.`,
      payload: token,
    });
  } catch (err) {
    return next(err);
  }
};

/*=======Activate User account and register user in database=====
method: POST , 
Route : /api/users/sign-up/activate_user_acc
==========================*/
const activateUserAccount = async (req, res, next) => {
  try {
    const isTokenExist =
      req.cookies[SIGN_UP_VERIFY_TOKEN_NAME] || req.body?.token;

    if (!isTokenExist) {
      return next(createError(400, "Token not found."));
    }
    try {
      const decoded = jwt.verify(isTokenExist, SIGN_UP_SECRET_KEY);
      if (!decoded) {
        return next(createError(400, "Unable to verify user."));
      }

      const userExist = await User.findOne({ email: decoded?.email });
      if (userExist) {
        return next(
          createError(
            409,
            "Error! User with this email already registerd. Please login.",
          ),
        );
      }

      const newUser = new User({
        name: decoded?.name,
        username: decoded?.username,
        email: decoded?.email,
        password: decoded?.password,
        mobile: decoded?.mobile,
        avatar: decoded?.avatar,
        role: decoded?.role,
        isAdmin: decoded?.isAdmin,
        isBanned: decoded?.isBanned,
      });

      const user = await newUser.save();

      if (!user) {
        return next(createError(404, "Registration unsuccessful."));
      }

      //Remove signup cookie
      res.clearCookie(SIGN_UP_VERIFY_TOKEN_NAME);

      res.status(201).json({
        success: true,
        msg: "User was registered successfully.",
        user,
      });
    } catch (err) {
      throw err;
    }
  } catch (err) {
    return next(err);
  }
};

/*=======Update One users=====
method: PUT , 
Route : /api/users/edit/:id
==========================*/
const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const options = { password: 0 };
    const updateOptions = { new: true, runValidators: true, context: "query" };
    let updates = {};

    //find user by id
    const oneUser = await findDataById(User, userId, "", "", options);
    if (!oneUser) {
      return next(createError(403, "No such user exixt."));
    }

    console.log("Email User checking-----");

    for (let key in req.body) {
      if (["name", "username", "mobile", "password"].includes(key)) {
        updates[key] = req.body[key] || oneUser[key];
      }
    }
    if (updates.email && updates.email !== oneUser.email) {
      return next(createError(404, "Email cannot be updated."));
    }

    if (
      req.body.password &&
      (req.body.password !== "" ||
        req.body.password !== null ||
        req.body.password !== undefined)
    ) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      updates.password = hashedPass;
    }

    console.log("----------Get all data except image -----");
    updates.avatar = oneUser?.avatar;
    if (req.file && req.file?.filename) {
      updates.avatar = req.file?.filename;
    }

    console.log("----------Get all data with image -----");
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      updateOptions,
    );
    console.log("----------DAta updated or not checking-----");
    if (!updatedUser) {
      return createError(
        404,
        "Unsuccessful! Couldn't updated data. Please, try again.",
      );
    }
    console.log("----------DAta updated -----");
    return res.status(200).json({
      success: true,
      msg: "User data is updated successfully",
      payload: updatedUser,
    });
  } catch (err) {
    console.log("Catch error-----");
    console.log(err.message);
    console.log("Catch error-----");
    return next(err);
  }
};

//🍪 4️⃣ How cookie is set (login/register)
// Example (login)
// res.cookie("accessToken", accessToken, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "strict",
//   maxAge: 15 * 60 * 1000, // 15 minutes
// });
// 5️⃣ Frontend must send cookies

// ⚠️ Very important!

// Axios
// axios.defaults.withCredentials = true;

// Fetch
// fetch(url, {
//   credentials: "include",
// });

/*=======Update User Password=====
method: PUT , 
Route : /api/users/edit/update-pass/me
==========================*/
const updatePassword = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { email, oldPassword, newPassword } = req.body;
    const options = {};
    const tokenEmail = req.user?.email;

    //find user by id
    if (email !== tokenEmail) {
      return next(
        createError(403, "You can only update your account password."),
      );
    }

    const oneUser = await findDataById(User, "", "", email, options);
    if (!oneUser) {
      return next(createError(403, "User unavailable."));
    }

    //Verifying old password
    const oldPassMatch = await bcrypt.compare(oldPassword, oneUser.password);
    if (!oldPassMatch) {
      return next(
        createError(401, "Invalid password. Please enter correct password."),
      );
    }

    //Update user password.
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
    };

    const updates = { $set: { password: hashedNewPassword } };

    const updatedUserPass = await User.findByIdAndUpdate(
      oneUser.id,
      updates,
      updateOptions,
    ).select("-password");

    if (!updatedUserPass) {
      return next(
        createError(404, "Password cannot be updated, please try again"),
      );
    }
    return res.status(200).json({
      success: true,
      msg: "User password is updated successfully",
      payload: updatedUserPass,
    });
  } catch (err) {
    console.log("Catch error-----");
    console.log(err.message);
    console.log("Catch error-----");
    return next(err);
  }
};

/*=======Delete One users=====
Delete an user and user image/avatar
method: DELETE , 
Route : /api/users/delete/:id
==========================*/
const deleteOneUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    //find user by id
    const oneUser = await findDataById(User, id, "", "", options);
    if (!oneUser) {
      return next(createError(404, "No such user is available."));
    }

    //image/Avatar or profile picture deletion
    const imageFile = oneUser.avatar;
    const imgFolder = req.imageFolder;
    let imageRemove = null;
    if (imageFile && imageFile !== "defaultAvatar.png") {
      imageRemove = await deleteImage(imgFolder, imageFile);
      if (!imageRemove) {
        return next(
          createError(404, "Image/Profile picture couldn't be deleted."),
        );
      }
    }

    const userIsDeleted = await User.findOneAndDelete({
      _id: id,
      isAdmin: false,
    }).select(options);
    if (!userIsDeleted) {
      return next(createError(404, "User couldnot be deleted. Try again."));
    }

    return res.status(200).json({
      success: true,
      msg: "User is deleted successfully",
      payload: userIsDeleted,
    });
  } catch (err) {
    if (err instanceof mongoose.Error) {
      return next(createError(400, "Database Error!."));
    }
    return next(err);
  }
};

//routes create for update pass
// email, new paass, old pass receive from req.body

module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  activateUserAccount,
  updateUser,
  updatePassword,
  deleteOneUser,
};
