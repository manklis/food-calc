const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Add a food name"],
  },
  calories: Number,
  price: Number,
});

module.exports = mongoose.model("foodItems", foodSchema);
