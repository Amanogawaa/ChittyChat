import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  const handleError = (res, status, message) =>
    res.status(status).json({ error: message });

  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return handleError(res, 401, "Unauthorized - No Token Provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return handleError(res, 401, "Unauthorized - Invalid Token");
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return handleError(res, 404, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error.message);

    if (error.name === "TokenExpiredError") {
      return handleError(res, 401, "Token expired. Please log in again.");
    }

    handleError(res, 500, "Internal server error");
  }
};

export default protectRoute;
