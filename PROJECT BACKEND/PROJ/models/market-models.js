const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Product name must be at least 2 characters long"],
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },

    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      lowercase: true,
      enum: {
        values: [
          "dairy",
          "bakery",
          "fruits",
          "vegetables",
          "meat",
          "drinks",
          "snacks",
          "household",
        ],
        message: "Please provide a valid category",
      },
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },

    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },

    brand: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
    },

    imageUrl: {
      type: String,
      trim: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be greater than 5"],
    },

    reviews: {
      type: Number,
      default: 0,
      min: [0, "Reviews count cannot be negative"],
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;