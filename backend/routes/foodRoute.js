const express = require("express");
const router = express.Router();
const {
  getItem,
  setItem,
  updateItem,
  deleteItem,
} = require("../controllers/foodController");
router.get("/", getItem);

router.post("/", setItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);
module.exports = router;
