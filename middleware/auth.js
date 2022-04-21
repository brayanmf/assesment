const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const User = require("../auth/user.model");
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new ErrorHandler("Inicie sesión para acceder a este recurso", 401)
    );
  }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeData.id);
  if (!req.user) {
    return next(
      new ErrorHandler("Inicie sesión para acceder a este recurso", 401)
    );
  }
  next();
};
