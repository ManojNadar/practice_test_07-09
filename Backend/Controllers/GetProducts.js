import Products from "../Model/ProductModel.js";

export const GetProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({});
    // const allProducts = await Products.find({ isBlocked: false,
    //   isVerified: true,});

    if (allProducts?.length) {
      return res.status(200).json({
        success: true,
        message: "All Products Fetched",
        allProducts: allProducts,
      });
    } else {
      res.status(404).json({ success: false, message: "No Product Found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error from catch block",
    });
  }
};
