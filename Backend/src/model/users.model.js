const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // Additional fields for user details (example- name, age, address, etc.)
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
