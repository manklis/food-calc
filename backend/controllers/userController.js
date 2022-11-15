const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

// Register a new User
// POST request
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
    return;
  }
  //check if user Exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ success: false, message: "User already exists" });
    return;
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  //create user with hashed password in DB
  const user = await User.create({
    name,
    email,
    password: hashedPass,
  });

  if (user) {
    res.status(201).json({
      sucess: true,
      message: "Success in registering user",
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ sucess: false, message: "User data is invalid" });
  }
};

// Log in for a User
// POST request
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ sucess: false, message: "Email or password empty" });
    return;
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      sucess: true,
      message: "Success in logging in",
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Incorrect email or password" });
  }
};

const getMe = async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    message: `Success in getting ${name}'s information`,
    id: _id,
    name,
    email,
  });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
