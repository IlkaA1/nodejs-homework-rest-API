const path = require("path");

const multer = require("multer");
const uploadDir = path.join(__dirname, "../", "tmp");
console.log(uploadDir);

// const storage = multer.diskStorage({
//   destination: uploadDir,
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
