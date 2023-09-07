import Products from "../Model/ProductModel.js";

export const GetEditProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId)
      return res.status(404).json({
        success: false,
        message: "Id is Required",
      });

    const findProduct = await Products.findById(productId);

    if (findProduct) {
      return res.status(200).json({
        success: true,
        singleProduct: findProduct,
      });
    }
  } catch (error) {
    res.status(505).json({
      success: false,
      message: "server error",
    });
  }
};
