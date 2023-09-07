import Product from "../Model/ProductModel.js";

export const SingleProduct = async (req, res) => {
  const { singleprodId } = req.body;

  if (!singleprodId)
    return res.status(404).json({
      success: false,
      message: "product id is required",
    });
  const product = await Product.findById(singleprodId);

  if (product) {
    return res.status(200).json({
      success: true,
      singleProductData: product,
    });
  }

  return res.status(404).json({
    success: false,
    message: "product not found",
  });
};
