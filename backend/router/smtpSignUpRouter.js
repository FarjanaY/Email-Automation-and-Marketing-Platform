const express = require("express");
const {
  getSMTPSignupSettings,
  updateSMTPSignupSettings,
  addSMTPSignupSettings,
  deleteSMTPSignupSettings,
} = require("../controller/smtpSignupSettingsController");

const smtpSignupRouter = express.Router();

//===  /api/admin=======
smtpSignupRouter.get("/smtp-settings", getSMTPSignupSettings);
smtpSignupRouter.put("/smtp-settings/update", updateSMTPSignupSettings);
smtpSignupRouter.post("smtp-settings/add", addSMTPSignupSettings);
smtpSignupRouter.delete("smtp-settings/delete/:id", deleteSMTPSignupSettings);

module.exports = smtpSignupRouter;
