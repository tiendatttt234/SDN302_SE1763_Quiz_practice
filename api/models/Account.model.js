const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

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
    match: [
      /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
      "Password must be at least 8 characters long and contain both letters and numbers",
    ],
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
  },
  userName: {
    type: String,
    trim: true,
  },
  roles: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Role",
      required: true,
    },
  ],
});

// Apply soft delete plugin to the schema
AccountSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Create the Account model
const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
