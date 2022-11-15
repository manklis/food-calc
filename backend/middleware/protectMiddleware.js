const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res
        .status(401)
        .json({ success: false, message: "You are not Authorized" });
    }
  }

  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "No token, not authorized" });
  }
};
module.exports = { protect };
