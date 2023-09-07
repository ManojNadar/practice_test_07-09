import Product from "../Model/ProductModel.js";
import User from "../Model/UserModel.js";

// BLOCK USER //***************************** */

export const blockuser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    );

    if (user) {
      return res.status(200).json({
        success: true,
        message: "User Blocked Succefully",
        user: user,
      });
    }

    return res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};

// UNBLOCK USER //***************************** */

export const unBlockuser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true }
    );

    if (user) {
      return res.status(200).json({
        success: true,
        message: "User unBlocked Succefully",
        user: user,
      });
    }

    return res.status(404).json({ status: "error", message: "server error" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};

// BLOCK PRODUCT //***************************** */

export const blockProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      { isBlocked: true },
      { new: true }
    );

    if (product) {
      return res
        .status(200)
        .json({ success: true, message: "product blocked Successfully" });
    }

    return res.status(404).json({ status: "error", message: "internal error" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};

// UNBLOCK PRODUCT //***************************** */

export const unBlockProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      { isBlocked: false },
      { new: true }
    );

    if (product) {
      return res
        .status(200)
        .json({ success: true, message: "product unblocked Successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};

// Verify PRODUCT //***************************** */

export const verifyProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const verfiedproduct = await Product.findByIdAndUpdate(
      productId,
      { isVerified: true },
      { new: true }
    );

    if (verfiedproduct) {
      return res
        .status(200)
        .json({ success: true, message: "Product Verified successfully" });
    }

    return res.status(404).json({ status: "error", message: "internal error" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};

// GET ALL BUYERS *************************************

export const getAllBuyers = async (req, res) => {
  try {
    const user = await User.find({ role: "Buyer" });

    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "all buyers", user: user });
    }

    return res.status(404).json({ success: false, message: "no buyer found" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};

// GET ALL Sellers *************************************
export const getAllSellers = async (req, res) => {
  try {
    const user = await User.find({ role: "Seller" });
    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "all Sellers", user: user });
    }

    return res.status(404).json({ success: false, message: "no seller found" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};

// GET ALL Products verified and non verified *************************************
export const getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find({});

    if (Products) {
      return res.status(200).json({
        success: true,
        message: "all Products here",
        Products: Products,
      });
    }
    return res
      .status(404)
      .json({ success: false, message: "no products found" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};

// getVerifiedProducts ***********************************

export const getVerifiedProducts = async (req, res) => {
  try {
    const Products = await Product.find({ isVerified: true });

    if (Products.length) {
      return res.status(200).json({
        success: true,
        message: "all verified Products here",
        Products: Products,
      });
    }

    return res.status(200).json({
      success: true,
      message: "No verified products",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};

// getUnVerifiedProducts ***********************************

export const getUnVerifiedProducts = async (req, res) => {
  try {
    const Products = await Product.find({ isVerified: false });

    if (!Products.length) {
      return res.status(200).json({
        success: true,
        message: "No Unverified products",
      });
    }

    return res.status(200).json({
      success: true,
      message: "all unVerified Products here",
      Products: Products,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};

// getBlocked Products ***********************************

export const getBlockedProducts = async (req, res) => {
  try {
    const Products = await Product.find({ isBlocked: true });

    if (!Products.length) {
      return res.status(200).json({
        success: true,
        message: "No Blocked products",
      });
    }

    return res.status(200).json({
      success: true,
      message: "all Blocked Products here",
      Products: Products,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "error from try catch block" });
  }
};


