const express = require("express");
const multer = require("multer");

//Internal Imports
const {
  getOneUser,
  getAllUsers,
  addUser,
  updateUser,
  deleteOneUser,
  activateUserAccount,
  updatePassword,
  forgotPassword,
} = require("../controller/usersController");
const { profileImageFolder } = require("../helper/deleteImage");
const {
  addUserValidators,
  updatePasswordValidations,
  forgotPasswordValidations,
} = require("../validations/userValidations");
const runValidations = require("../validations/runValidations");
const singleFileUpload = require("../middlewares/common/fileUpload/singleFileUpload");
const { checkLogin } = require("../middlewares/authGaurd/checkLogin");
const checkedRole = require("../middlewares/authGaurd/chekedRoleMiddleware");
const isAccOwner = require("../middlewares/authGaurd/isAccOwner");
const refreshTokeGenerate = require("../middlewares/authGaurd/refreshTokenGenerate");

const usersRouter = express.Router();

//route = /api/users/

usersRouter.get(
  "/all-users",
  refreshTokeGenerate,
  checkLogin,
  checkedRole("admin"),
  getAllUsers,
);
//Id is optional and can use this route for search or email from body
//usersRouter.get("/one/:id?", getOneUser);//Not applicable for express v5
usersRouter.get("/one/:id", refreshTokeGenerate, checkLogin, getOneUser);
usersRouter.get("/one", refreshTokeGenerate, checkLogin, getOneUser);
usersRouter.post(
  "/sign-up/verify",
  profileImageFolder,
  singleFileUpload,
  addUserValidators,
  runValidations,
  addUser,
);
usersRouter.post("/sign-up/activate_user_acc", activateUserAccount);

usersRouter.put(
  "/edit/:id",
  refreshTokeGenerate,
  checkLogin,
  isAccOwner,
  profileImageFolder,
  singleFileUpload,
  runValidations,
  updateUser,
);

usersRouter.put(
  "/edit/update-pass/me",
  refreshTokeGenerate,
  checkLogin,
  // isAccOwner,
  updatePasswordValidations,
  runValidations,
  updatePassword,
);

usersRouter.delete(
  "/delete/:id",
  refreshTokeGenerate,
  checkLogin,
  isAccOwner,
  profileImageFolder,
  deleteOneUser,
);

module.exports = usersRouter;
