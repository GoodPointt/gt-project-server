const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { _id } = req.user
    if (!file) {
      return {};
    }

    let folder;
    if (file.fieldname === 'avatarURL') {
      folder = 'avatars';
    }

    const transformation = {
      width: 250,
      height: 250,
      crop: 'fill',
    };

    const filename = file.originalname.split(".")[0]

    return {
      folder: folder,
      allowed_formats: ['png', 'jpg', 'webp', 'jpeg'],
      public_id: `${_id}_${filename}`,
      transformation: [transformation],
    };
  },
});

const upload = multer({
  storage
});

module.exports = upload;