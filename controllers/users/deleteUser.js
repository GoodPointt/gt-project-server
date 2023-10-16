const { User } = require("../../models/user");
const { HttpError } = require("../../utils");


const deleteUser = async (req, res) => {
    const { _id, email } = req.user

    const deleteUser = await User.findByIdAndRemove({ _id })
    if (!deleteUser) throw HttpError(404, "User not found")

    res.status(200).json({
        "message": `User ${email}  delete success`
    })
}

module.exports = deleteUser