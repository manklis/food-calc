const FOODITEM = require("../models/foodModel");
const User = require("../models/userModel");

// GET Request for /calc
const getItem = async (req, res) => {
  try {
    const foodItems = await FOODITEM.find({ user: req.user.id });
    res.status(200).json(foodItems); //{
    //success: true,
    //message: `Here is ${req.user.name}'s list of food items`,
    //foodItems,
    //});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong", error });
  }
};

// POST Request for /calc
const setItem = async (req, res) => {
  console.log(req.body.name);
  if (!req.body.name) {
    res
      .status(400)
      .json({ success: false, message: "Please add name of item" });
    return;
    //throw new Error("Add a text");
  }
  const foodItem = await FOODITEM.create({
    user: req.user.id,
    name: req.body.name,
    calories: req.body.calories,
    price: req.body.price,
  });
  res.status(200).json(foodItem); //{
  // success: true,
  // message: `Successfully added Item to ${req.user.name}'s food list`,
  //foodItem,
  // });
};

// PUT Request for /calc/:id
const updateItem = async (req, res) => {
  const foodItem = await FOODITEM.findById(req.params.id);
  if (!foodItem) {
    res.status(400).json({ success: false, message: "foodItem not found" });
    return;
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ success: false, message: "User not found" });
  }
  //check if user that is logged in matches the food item's user
  if (foodItem.user.toString() !== user.id) {
    res.status(401).json({ success: false, message: "User not authorized" });
  }
  const oldFoodItem = foodItem.name;
  const updatedItem = await FOODITEM.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    message: `Successfully updated Item ${req.params.id}, ${oldFoodItem} to ${updatedItem.name}`,
    updatedItem,
  });
};

// DELETE Request for /calc/:id
const deleteItem = async (req, res) => {
  const foodItem = await FOODITEM.findById(req.params.id);
  if (!foodItem) {
    res.status(400).json({ success: false, message: "Item not found" });
    return;
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ success: false, message: "User not found" });
  }
  //check if user that is logged in matches the food item's user
  if (foodItem.user.toString() !== user.id) {
    res.status(401).json({ success: false, message: "User not authorized" });
  }

  await foodItem.remove();
  res.status(200).json({
    success: true,
    message: `Deleted food item ${req.params.id}, ${foodItem.name}`,
    id: req.params.id,
  });
};
module.exports = {
  getItem,
  setItem,
  updateItem,
  deleteItem,
};
