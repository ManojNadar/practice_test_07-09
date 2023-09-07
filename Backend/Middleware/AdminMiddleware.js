import User from "../Model/UserModel.js";
import jwt from "jsonwebtoken";

export const adminMiddleware = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token)
      return res.status(404).json({
        status: "error",
        message: "token is required",
      });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodeToken) {
      return res
        .status(404)
        .json({ status: "error", message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    // console.log(user);

    if (!user || user?.role !== "Admin")
      return res
        .status(404)
        .json({ status: "error", message: "You are not a seller" });

    next();
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};

// is valid User

export const isvalidUser = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token)
      return res.status(404).json({
        status: "error",
        message: "token is required",
      });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodeToken) {
      return res
        .status(404)
        .json({ status: "error", message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    // console.log(user);

    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "You are not a user" });

    next();
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};
