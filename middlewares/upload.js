const multer = require('multer');
const path = require('path');

const { HttpError } = require('../utils');

const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  limits: {
    fieldNameSize: 300,
    fileSize: 1000000,
  },
  fileFilter: (req, file, callback) => {
    const acceptableExtensions = ['.png', '.jpg', '.webp', 'jpeg'];
    if (!acceptableExtensions.includes(path.extname(file.originalname))) {
      return callback(HttpError(400, 'Wrong file type'));
    }

    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 1000000) {
      return callback(HttpError(400, 'File size too large'));
    }

    callback(null, true);
  },
});

module.exports = upload;
