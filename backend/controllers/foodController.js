// GET Request for /calc
const getItem = (req, res) => {
  res.status(200).json({ message: "Get food item" });
};

// POST Request for /calc
const setItem = (req, res) => {
  res.status(200).json({ message: "Add food item" });
};

// PUT Request for /calc/:id
const updateItem = (req, res) => {
  res.status(200).json({ message: `Update food item ${req.params.id}` });
};

// DELETE Request for /calc/:id
const deleteItem = (req, res) => {
  res.status(200).json({ message: `Delete food item ${req.params.id}` });
};
module.exports = {
  getItem,
  setItem,
  updateItem,
  deleteItem,
};
