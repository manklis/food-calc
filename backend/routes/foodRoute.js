const express = require("express");
const router = express.Router();
const {
  getItem,
  setItem,
  updateItem,
  deleteItem,
} = require("../controllers/foodController");

const { protect } = require("../middleware/protectMiddleware");

router.get("/", protect, getItem);
router.post("/", protect, setItem);
router.put("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);

module.exports = router;
