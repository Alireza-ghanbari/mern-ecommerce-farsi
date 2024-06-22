import Category from "../models/category.model.js";

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error in getAllCategory controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.log("Error in addCategory controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      message: "Category updated successfully",
      data: updateCategory,
    });
  } catch (error) {
    console.log("Error in updateCategory controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const cat = await Category.findByIdAndDelete(id);
    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteCategory controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
