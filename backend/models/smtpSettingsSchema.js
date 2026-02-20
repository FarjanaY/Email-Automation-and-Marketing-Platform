const mongoose = require("mongoose");

const smtpSettingsSchema = mongoose.Schema({
  smptUser: String,
  smtpPass: String,
});

smtpSettingsSchema.pre("save", async function (next) {
  if (!this.isModified("smtpPass")) return next();
  this.smtpPass = await bcrypt.hash(this.smtpPass, 12);
  next();
});

const SmtpSettings = mongoose.model("SmtpSettings", smtpSettingsSchema);

module.exports = SmtpSettings;
