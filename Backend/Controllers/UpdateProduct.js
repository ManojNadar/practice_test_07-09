import jwt from "jsonwebtoken";
import Products from "../Model/ProductModel.js";

export const UpdateProduct = async (req, res) => {
  try {
    const { title, price, image, category } = req.body.productData;

    // console.log(title, price, image, category);

    const { token, productId } = req.body;

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res.status(404).json({
        success: false,
        message: "not a valid token",
      });
    }

    const userId = decodeToken?.userId;

    if (userId) {
      const updateProduct = await Products.findOneAndUpdate(
        { userId: userId, _id: productId },
        { title, price, image, category },
        { new: true }
      );

      console.log(updateProduct);

      res.status(200).json({
        success: true,
        message: "updated success",
        updatedProduct: updateProduct,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error from catch block",
      error: error,
    });
  }
};
