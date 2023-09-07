import ProductModel from "../Model/ProductModel.js";
import User from "../Model/UserModel.js";
import jwt from "jsonwebtoken";

export const addtocart = async (req, res) => {
  try {
    const { productId, token } = req.body;

    if (!token || !productId)
      throw new Error("Token and productId is required");

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById({ _id: userId });
    // console.log(user?.cart);
    for (let i = 0; i < user?.cart?.length; i++) {
      if (user.cart[i] == productId) {
        return res
          .status(404)
          .json({ success: false, message: "Product already added" });
      }
    }

    user?.cart.push(productId);
    await user.save();

    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Catch block Error",
      error: error.message,
    });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const { token } = req.body;
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    if (user) {
      let finalProduct = [];
      for (let i = 0; i < user.cart.length; i++) {
        const product = await ProductModel.findById(user.cart[i]);

        if (product) {
          finalProduct.push(product);
        }
      }
      return res.status(200).json({ success: true, product: finalProduct });
    }

    throw new Error("User not Found");
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Catch block Error",
    });
  }
};

export const deleteCartProduct = async (req, res) => {
  try {
    const { productId, token } = req.body;
    if (!token || !productId)
      throw new Error("Token and productId is required");

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById({ _id: userId });

    const ourCartProduct = user.cart;

    // console.log(ourCartProduct);

    // const removeProduct = ourCartProduct.indexOf(productId);

    // ourCartProduct.splice(removeProduct, 1);

    const filterCartProduct = ourCartProduct.filter((e) => e !== productId);

    user.cart = filterCartProduct;

    await user.save();

    const refreshCart = await User.findById({ _id: userId });

    if (refreshCart) {
      let finalProduct = [];
      for (let i = 0; i < refreshCart.cart.length; i++) {
        const product = await ProductModel.findById(refreshCart.cart[i]);

        if (product) {
          finalProduct.push(product);
        }
      }
      return res.status(200).json({
        success: true,
        products: finalProduct,
        message: "product removed Success",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

export const addWishList = async (req, res) => {
  try {
    const { productId, token } = req.body;

    if (!token || !productId)
      throw new Error("Token and productId is required");

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById({ _id: userId });

    user?.wishlist.push(productId);
    await user.save();

    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Catch block Error",
      error: error.message,
    });
  }
};
export const getWishList = async (req, res) => {
  try {
    const { token } = req.body;
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    if (user) {
      let finalProduct = [];
      for (let i = 0; i < user.wishlist.length; i++) {
        const product = await ProductModel.findById(user.wishlist[i]);

        if (product) {
          finalProduct.push(product);
        }
      }
      return res.status(200).json({ success: true, product: finalProduct });
    }

    throw new Error("User not Found");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Catch block Error",
    });
  }
};

export const buyProduct = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res.status(404).json({
        success: false,
        message: "token is required",
      });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodeToken?.userId;

    const user = await User.findById(userId);

    if (user) {
      user.cart = [];
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Product will deliver soon",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error from catch block",
    });
  }
};
