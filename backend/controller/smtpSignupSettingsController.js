//External Imports
const createError = require("http-errors");
const SmtpSettings = require("../models/smtpSettingsSchema");
const findDataById = require("../helper/findDataByIdService");
const User = require("../models/userSchema");

/* =======Get SMTP Sign up Settings======
method: GET
route: /api/admin/smtp-settings
============================================*/
const getSMTPSignupSettings = async (req, res, next) => {
  try {
    const { smtpUsername } = req.body;

    const isDataExist = await SmtpSettings.findOne({
      smtpUser: smtpUsername,
    }).lean();
    if (!isDataExist) {
      return next(createError(400, "Error! SMTP user was not found."));
    }

    const { smtpUser, smtpPass } = isDataExist;
    const smtpData = { smtpUser, smtpPass };

    res.status(200).json({
      success: true,
      msg: `Requested data found.`,
      smtpData,
    });
  } catch (err) {
    console.log("SMTP Settings Error=", err);
    console.log(err.message);
    return next(err);
  }
};

/* =======Add SMTP Sign up Settings======
method: POST
route: /api/admin/smtp-settings/add
================================================*/
const addSMTPSignupSettings = async (req, res, next) => {
  try {
    const { smtpUser, smtpPass } = req.body;

    if (!smtpUser || !smtpPass) {
      return next(createError(400, "Error! SMTP settings data is missing"));
    }

    const options = { password: 0 };
    const smtpSettingsData = await SmtpSettings.create({
      smtpUser,
      smtpPass,
    }).select(options);

    if (!smtpSettingsData) {
      return next(createError(401, "Error! Couldnot add the SMTP seetings."));
    }

    res.status(200).json({
      success: true,
      msg: `SMTP settings added successfuly.`,
      smtpSettingsData,
    });
  } catch (err) {
    console.log("Added SMTP Settings Error=", err);
    console.log(err.message);
    return next(err);
  }
};

/* =======Updated SMTP Sign up Settings======
method: PUT
route: /api/admin/smtp-settings/update
================================================*/
const updateSMTPSignupSettings = async (req, res, next) => {
  try {
    const { smtpUser, smtpPass } = req.body;

    if (!smtpUser || !smtpPass) {
      return next(createError(400, "smtp settings data is missing"));
    }

    const isDataExist = await SmtpSettings.findOne({
      smtpUser: smtpUser,
    }).lean();

    if (!isDataExist) {
      return next(createError(400, "smtp user was not found."));
    }

    const options = { password: 0 };
    const updatedSettings = await SmtpSettings.findOneAndUpdate(
      {},
      { smtpPass },
      { new: true }
    ).select(options);

    res.status(200).json({
      success: true,
      msg: `SMTP settings updated successfuly.`,
      updatedSettings,
    });
  } catch (err) {
    console.log("Updated SMTP Settings=", err);
    console.log(err.message);
    return next(err);
  }
};

/* =======Delete SMTP Sign up Settings======
method: DELETE
route: /api/admin/smtp-settings/delete/:id
============================================*/
const deleteSMTPSignupSettings = async (req, res, next) => {
  try {
    const smtpId = req.params.id;

    const deleteSmtpSettings = await SmtpSettings.findByIdAndDelete({
      id: smtpId,
    }).lean();

    if (!deleteSmtpSettings) {
      return next(createError(400, "Error! SMTP user was not found."));
    }

    res.status(200).json({
      success: true,
      msg: `SMTP settings is deleted successfully.`,
      smtpData,
    });
  } catch (err) {
    console.error("SMTP Settings Delete Error=", err);
    console.error(err.message);
    return next(err);
  }
};

module.exports = {
  getSMTPSignupSettings,
  addSMTPSignupSettings,
  updateSMTPSignupSettings,
  deleteSMTPSignupSettings,
};
