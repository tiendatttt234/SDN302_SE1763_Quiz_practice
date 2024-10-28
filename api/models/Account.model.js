const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please fill valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return v.length === 10;
      },
      message: "Phone number must be exactly 10 characters long",
    },
  },
  avatar: {
    type: String,
    default: "",
  },

  userName: {
    type: String,
    trim: true,
  },
  roles: {
    type: mongoose.Schema.ObjectId,
    ref: "Role",
    required: true,
  },
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
