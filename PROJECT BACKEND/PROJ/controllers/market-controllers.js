const fs = require("fs");
const Product = require("../models/market-models");
 
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
 
    res.status(200).json({
      status: "success",
      count: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch products: ${error.message}`,
    });
  }
};
 
const createProduct = async (req, res) => {
  try {
    const category = req.body.category
    const level = req.body.level
 
    const newProduct = await Product.create({
      ...req.body,
      category,
      level,
    });
 
    res.status(201).json({
      status: "success",
      message: "New product added",
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to create product: ${error.message}`,
    });
  }
};
 
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
 
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
 
    res.status(200).json({
      status: "success",
      data: { product },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to create product: ${error.message}`,
    });
  }
};
 
const updateProduct = async (req, res) => {
  try {
    if (req.body.category){ req.body.category = req.body.category.toLowerCase()}
    if (req.body.level){ req.body.level = req.body.level.toLowerCase()}
 
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
 
    res.status(200).json({
      status: "success",
      message: "Product updated",
      data: {
        product: updatedProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to update product: ${error.message}`,
    });
  }
};
 
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
 
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
 
    res.status(200).json({
      status: "success",
      message: "Product deleted",
      data: {
        product: deletedProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to delete product: ${error.message}`,
    });
  }
};
 
module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};