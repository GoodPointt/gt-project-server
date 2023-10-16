const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const { HttpError } = require("../../utils");

const changePassword = async (req, res) => {
    const { _id } = req.user
    const { password } = req.body
    console.log("pass", password)
    const hashedNewPassword = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(_id, { password: hashedNewPassword }, { new: true })
    console.log("user", user.password)
    if (!user) throw HttpError(404)


    res.status(200).json({ message: "Password change success" })
}

module.exports = changePassword