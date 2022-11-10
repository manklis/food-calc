const FOODITEM = require("../models/foodModel");

// GET Request for /calc
const getItem = async (req, res) => {
  try {
    const foodItems = await FOODITEM.find();
    res.status(200).json(foodItems);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong", error });
  }
};

// POST Request for /calc
const setItem = async (req, res) => {
  if (!req.body.name) {
    res
      .status(400)
      .json({ success: false, message: "Please add name of item" });
    return;
    //throw new Error("Add a text");
  }
  const foodItem = await FOODITEM.create({
    name: req.body.name,
    calories: req.body.calories,
    price: req.body.price,
  });
  res
    .status(200)
    .json({ sucess: true, message: "Successfully added Item", foodItem });
};

// PUT Request for /calc/:id
const updateItem = async (req, res) => {
  const foodItem = await FOODITEM.findById(req.params.id);
  if (!foodItem) {
    res.status(400).json({ success: false, message: "foodItem not found" });
    return;
  }

  const updatedItem = await FOODITEM.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    message: `Successfully updated Item ${req.params.id}`,
    updatedItem,
  });
};

// DELETE Request for /calc/:id
const deleteItem = async (req, res) => {
  const foodItem = await FOODITEM.findById(req.params.id);
  if (!foodItem) {
    req.status(400).json({ success: false, message: "Item not found" });
    return;
  }
  await foodItem.remove();
  res.status(200).json({
    success: true,
    message: `Deleted food item ${req.params.id}`,
  });
};
module.exports = {
  getItem,
  setItem,
  updateItem,
  deleteItem,
};
