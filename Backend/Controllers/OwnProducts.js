import Products from "../Model/ProductModel.js";
import jwt from "jsonwebtoken";

export const OwnProducts = async (req, res) => {
  try {
    const { token } = req.body;

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res.status(404).json({
        success: false,
        message: "not a valid token",
      });
    }

    const userId = decodeToken?.userId;

    const yourProducts = await Products.find({ userId });

    if (yourProducts.length) {
      return res.status(200).json({
        success: true,
        message: "your products",
        yourProducts: yourProducts,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Sorry no products",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error from catch block",
      error: error,
    });
  }
};
