import ApiFeatures from "../lib/utils/apiFeatures.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const features = new ApiFeatures(Product, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const product = await features.query;
    res.status(200).json(product);
  } catch (error) {
    console.log("Error in getAllProducts controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { ...productInfo } = req.body;
    const newProduct = await Product.create({ ...productInfo });
    res.status(201).json({
      message: "New product added",
      data: {
        newProduct,
      },
    });
  } catch (error) {
    console.log("Error in addProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log("Error in getProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      message: "Product updated successfully",
      data: updateProduct,
    });
  } catch (error) {
    console.log("Error in updateProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(201).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
