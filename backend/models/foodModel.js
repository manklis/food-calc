const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Add a food name"],
    },
    calories: Number,
    price: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("foodItems", foodSchema);
