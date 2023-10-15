const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const { HttpError } = require("../../utils");

const changePassword = async (req, res) => {
    const { _id } = req.user
    const { password } = req.body

    const hashedNewPassword = await bcrypt.hash(password, 10);

    const user = User.findByIdAndUpdate(_id, { password: hashedNewPassword }, { new: true })
    if (!user) throw HttpError(404)


    res.status(200).json({ message: "Password change success" })
}

module.exports = changePassword