const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isRecruiter: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
