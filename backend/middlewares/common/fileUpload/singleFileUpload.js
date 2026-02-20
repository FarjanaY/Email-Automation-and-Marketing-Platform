const fileUploader = require("../../../helper/fileUploader");
const handleUpload = require("./fileUploadMiddlwareCall");

function singleFileUpload(req, res, next) {
  const imageFolderName = req.imageFolder || "avatar";
  const maxFileSize = 1050000; //1mb
  const maxFileNum = 1;
  const upload = fileUploader(
    imageFolderName,
    ["image/jpeg", "image/jpg", "image/png"],
    maxFileSize,
    maxFileNum,
    "Only .jpg, .png or .jpeg format are allowed."
  );

  //Call the middleware function
  const middleware = upload.single("avatar");
  //const middleware = upload.any();
  return handleUpload(middleware, maxFileSize, maxFileNum)(req, res, next);
}

module.exports = singleFileUpload;
