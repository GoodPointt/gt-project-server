const User = require("../models/user");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

async function editProfile(req, res) {
  try {
    const userId = req.user.id;

    const { name, email, newPassword } = req.body;

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.findByIdAndUpdate(userId, {
        name,
        email,
        password: hashedPassword,
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        name,
        email,
      });
    }

    if (req.file) {
      const { path: tempUpload, originalname } = req.file;

      const filename = `${userId}_${originalname}`;
      const resultUpload = path.join(avatarsDir, filename);

      await Jimp.read(tempUpload)
        .then((file) => {
          return file.resize(250, 250).quality(60).write(resultUpload);
        })
        .catch((err) => {
          console.error(err);
        });

      const avatarURL = path.join("avatars", filename);

      await User.findByIdAndUpdate(userId, { avatarURL });

      await fs.unlink(tempUpload);
    }

    res.status(200).json({ message: "Профіль користувача успішно оновлено" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Помилка сервера" });
  }
}

module.exports = {
  editProfile,
};
