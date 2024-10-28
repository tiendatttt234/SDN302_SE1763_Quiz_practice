const bcrypt = require("bcrypt");
const Account = require("../models/Account.model");

const changePass = async (req, res) => {
  try {
    const { userName } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Validate required fields
    if (!userName || !oldPassword || !newPassword) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }

    // Find the user - Use lean() for better performance
    const user = await Account.findOne({ userName }).lean();

    // Debug log
    console.log("Finding user with userName:", userName);
    console.log("Found user:", user);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy người dùng",
      });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Mật khẩu hiện tại không đúng",
      });
    }

    // Hash new password
    const saltRounds = parseInt(process.env.PASSWORD_SECRET) || 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password using findOneAndUpdate
    const updatedUser = await Account.findOneAndUpdate(
      { userName: userName }, // Make sure we're using the correct userName
      { $set: { password: hashedPassword } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: false,
        message: "Cập nhật mật khẩu thất bại",
      });
    }

    res.status(200).json({
      status: true,
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

module.exports = {
  changePass,
};
