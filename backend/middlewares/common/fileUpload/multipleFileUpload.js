//internal imports
const fileUploader = require("../../../helper/fileUploader");
const handleUpload = require("./fileUploadMiddlwareCall");

function multipleUpload(req, res, next) {
  const imageFolderName = req.imageFolder;
  const maxFileSize = 1050000; //1mb
  const maxFileNum = 5
  const upload = fileUploader(
    imageFolderName,
    ["image/jpeg", "image/jpg", "image/png"],
    maxFileSize,
    maxFileNum,
    "Only .jpg, .png or .jpeg format are allowed."
  );

  //Call the middleware function
  const middleware = upload.array("photos", maxFileNum);
  return handleUpload(middleware, maxFileSize, maxFileNum)(req, res, next);
}

module.exports = multipleUpload;
