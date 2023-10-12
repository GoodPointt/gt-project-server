const fs = require('fs/promises');
const path = require('path');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { BASE_URL } = process.env;
const { User } = require('../../models/user');
const { HttpError, sendEmailSendGrid } = require('../../utils');

const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, 'Email already exist');

  const hashedPassword = await bcrypt.hash(password, 10);

  let avatarURL = '';
  const verificationToken = nanoid();

  if (!req.file) {
    avatarURL = gravatar.url(email);
  }

  if (req.file) {
    const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');
    const { path: tempUpload, originalname } = req.file;
    const filename = `${Date.now()}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    avatarURL = path.join('avatars', filename);
  }

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const msg = {
    to: email,
    subject: 'Welcome!',
    html: `<p>Please finish authorization by following link below. <a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Confirm registration!</a></p>`,
  };

  sendEmailSendGrid(msg);

  res.status(201).json({ email: newUser.email, name: newUser.name });
};

module.exports = signUp;
