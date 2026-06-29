const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/custom-orders/");
  },

  filename(req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.fieldname + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|pdf|webp|svg/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (extName) {
    cb(null, true);
  } else {
    cb(new Error("Only image or PDF files are allowed"));
  }
};

const customUpload = multer({
  storage,
  fileFilter,
});

module.exports = customUpload;