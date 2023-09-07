import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";

export const productMiddleWare = async (req, res, next) => {
  try {
    const { token } = req.body;

    console.log(token);

    if (!token)
      return res.status(404).json({
        success: false,
        message: "token is required",
      });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodeToken) {
      return res
        .status(404)
        .json({ success: false, message: "not a valid token" });
    }

    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    // console.log(user);

    if (user && user?.role === "Seller") {
      next();
    } else {
      res.status(404).json({ success: false, message: "You are not a seller" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "error from try catch block" });
  }
};
