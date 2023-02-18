const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  Event: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
