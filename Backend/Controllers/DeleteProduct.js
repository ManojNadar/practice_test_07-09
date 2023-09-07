import Product from "../Model/ProductModel.js";
import jwt from "jsonwebtoken";

export const DeleteProduct = async (req, res) => {
  try {
    const { productId, token } = req.body;
    // console.log(productId, token);
    if (!productId || !token)
      return res.status(404).json({
        success: false,
        message: "Product id and token is mandtory..",
      });

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedData?.userId;

    const isDeleted = await Product.findOneAndDelete({
      _id: productId,
      userId: userId,
    });
    if (isDeleted) {
      const products = await Product.find({});
      if (products) {
        console.log(products);
      }
      return res
        .status(200)
        .json({
          success: true,
          message: "Product Deleted Successfully.",
          products: products,
        });
    }

    throw new Error("Mongodb error");
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
