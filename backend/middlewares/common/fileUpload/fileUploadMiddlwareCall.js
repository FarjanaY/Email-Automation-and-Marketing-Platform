//Helper function to format file size
function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${bytes} bytes`;
  } else {
    // convert to MB with 2 decimals
    const mb = (bytes / (1024 * 1024)).toFixed(2);
    return `${mb} mb`;
  }
}

function handleUpload(uploadMiddleware, max_file_size, max_number_of_files) {
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        //Too many files
        if (err.code === "LIMIT_FILE_COUNT") {
          const msg =
            max_number_of_files === 1
              ? "Only single file is allowed to upload."
              : `Maximum ${max_number_of_files} are allowed to upload.`;
          return res.status(400).json({ errors: { fileUpload: { msg } } });
        }

        //File too large
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            errors: {
              fileUpload: {
                msg: `File too large! Max sixe is ${formatFileSize(
                  max_file_size
                )} `,
              },
            },
          });
        }

        //Other errors (mime type, unknown)
        return res.status(400).json({
          errors: {
            fileUpload: {
              msg: err.message,
            },
          },
        });
      }
      return next();
    });
  };
}

module.exports = handleUpload;
