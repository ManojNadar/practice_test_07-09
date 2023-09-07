import Product from "../Model/ProductModel.js";
import User from "../Model/UserModel.js";

// Ratings

export const addRatings = async (req, res) => {
  try {
    const { productId, rating } = req.body;

    if (rating > 5) {
      return res.status(404).json({
        success: false,
        message: "Not a valid Rating",
      });
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { $push: { ratings: rating } },
      { new: true }
    );

    if (product) {
      return res.status(201).json({
        success: true,
        message: "Ratings added successfully",
        Product: product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// Comments

export const addComments = async (req, res) => {
  try {
    const { productId, comment, userId } = req.body;

    const user = await User.findById(userId);

    const product = await Product.findByIdAndUpdate(
      productId,
      { $push: { comments: { comment, userId: userId, name: user.name } } },
      { new: true }
    );

    if (product) {
      return res.status(201).json({
        success: true,
        message: "Comments added successfully",
        Product: product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
