const Product = require("../models/market-models");
const deleteUploadedFile = require("../utils/delete-uploaded-file")
const User = require("../models/user-models");

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
      const newProduct = await Product.create({
      ...req.body,
      imageUrl:req.file?.filename
    });
 
    res.status(201).json({
      status: "success",
      message: "New product added",
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    if(req.file){
      deleteUploadedFile("products",req.file.filename)
    }
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
      message: `Failed to get product: ${error.message}`,
    });
  }
};
 
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
       
    if (req.file) {
      req.body.imageUrl = req.file.filename;
      if (product.imageUrl) {
        deleteUploadedFile("products", product.imageUrl);
      }
    }

    // 1. ادمج التعديلات الموجودة في req.body في كائن المنتج أولاً
    Object.assign(product, req.body);

    // 2. احفظ المنتج بعد التعديل
    const updatedProduct = await product.save();

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

     await User.updateMany(
    { myProducts: req.params.id },
    { $pull: { myProducts: req.params.id } })

    if (deletedProduct.imageUrl){
      deleteUploadedFile("products",deletedProduct.imageUrl)
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