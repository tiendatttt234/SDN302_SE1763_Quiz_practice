const express = require("express");
const Account = require("../models/Account.model");
const Role = require("../models/Role.model");
const accountController = require("../controllers/Account.controller");
const {listAccount, updateAccount, addAccount, deleteAccount } = require("../controllers/accountManagement");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");
const jwt = require("jsonwebtoken");
const multer = require("multer");

//api controller

const accountRouter = express.Router();
accountRouter.get("/list", listAccount);
accountRouter.delete("/delete/:id", deleteAccount);
accountRouter.put("/update/:id", updateAccount);
accountRouter.post("/add", addAccount);
accountRouter.put("/changepass/:userName", accountController.changePass);
//[POST] Register
accountRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password, userName } = req.body;
    if (!email || !password || !userName) {
      throw createError.BadRequest("Username and password are required");
    }
    const existingAccount = await Account.findOne({ userName })
      .populate("roles")
      .exec();
    if (existingAccount) throw createError.Conflict("User already exists");

    const hashPass = await bcrypt.hash(
      password,
      parseInt(process.env.PASSWORD_SECRET)
    );

    const userRole = await Role.findOne({ name: "user" });
    const roles = userRole ? [userRole._id] : [];

    const newAccount = new Account({
      email,
      userName,
      password: hashPass,
      roles,
    });
    const savedAccount = await newAccount.save();
    const accessToken = await signAccessToken(savedAccount._id);

    res.send({ accessToken, newAccount });
  } catch (error) {
    next(error);
  }
});

// [POST] Login
accountRouter.post("/login", async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const account = await Account.findOne({ userName })
      .populate("roles")
      .exec();
    if (!account) throw createError.NotFound("User not registered");

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch)
      throw createError.Unauthorized("Incorrect Username or Password");

    if (!account.roles || account.roles.length === 0) {
      throw createError.Forbidden("No roles assigned to this account");
    }

    const accessToken = await signAccessToken(account._id);
    const refreshToken = await signRefreshToken(account._id);

    res.status(200).json({
      avatar: account.avatar,
      accessToken,
      refreshToken,
      id: account._id,
      userName: account.userName,
      roles: account.roles,
    });
  } catch (error) {
    next(error);
  }
});

accountRouter.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      throw createError.BadRequest("Refresh token không hợp lệ");
    const userId = await verifyRefreshToken(refreshToken);
    if (userId) {
      const accessToken = await signAccessToken(userId);
      const newRefreshToken = await signRefreshToken(userId);
      res.send({ accessToken, refreshToken: newRefreshToken });
    }
  } catch (error) {
    next(error);
  }
}); // Trong file accountRouter.js

//[Get] getUser
// [GET] Lấy dữ liệu người dùng
accountRouter.get("/:userName", async (req, res, next) => {
  try {
    const { userName } = req.params;
    const account = await Account.findOne({ userName })
      .populate("roles")
      .exec();

    if (!account) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
});

// Update single field endpoint
accountRouter.patch("/:userName/field", async (req, res, next) => {
  try {
    const { userName } = req.params;
    const { field, value } = req.body;

    // Validate allowed fields
    const allowedFields = ["email", "phone", "userName", "birthday"];
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ message: "Invalid field name" });
    }

    const updateData = { [field]: value };
    const updatedAccount = await Account.findOneAndUpdate(
      { userName },
      updateData,
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: `User ${userName} not found` });
    }

    res.json({ success: true, data: updatedAccount });
  } catch (error) {
    next(error);
  }
});

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Update avatar endpoint
accountRouter.patch(
  "/:userName/avatar",
  upload.single("avatar"), // Expecting a file field named 'avatar'
  async (req, res, next) => {
    try {
      const { userName } = req.params;
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const updatedAccount = await Account.findOneAndUpdate(
        { userName },
        { avatar: req.file.path }, // Save file path to the database
        { new: true }
      );
      if (!updatedAccount) {
        return res.status(404).json({ message: `User ${userName} not found` });
      }
      res.json({ success: true, data: updatedAccount });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = accountRouter;
