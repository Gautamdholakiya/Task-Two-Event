const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    // required: true,
  },
  eventNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    lowercase: true,
  },
  status: {
    required: true,
    type: String,
  },
  premier: {
    required: true,
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      ref: "user",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("event", EventSchema);
