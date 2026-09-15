const Order = require("../models/order-models");
const User = require("../models/user-models");

const DELIVERY_FEE = 25;

const createOrder = async (req, res) => {
  try {

    const {
      fullName,
      phone,
      street,
      city,
      postalCode,
      paymentMethod
    } = req.body;

    if (!fullName || !phone || !street || !city || !postalCode || !paymentMethod) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide all customer information"
      });
    }

    const user = await User.findById(req.userId).populate("myProducts");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User Not Found"
      });
    }

    if (!user.myProducts || user.myProducts.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Your cart is empty"
      });
    }

    const grouped = {};

    for (const product of user.myProducts) {

      const id = product._id.toString();

      if (grouped[id]) {

        grouped[id].quantity += 1;

      } else {

        grouped[id] = {
          product: product._id,
          quantity: 1,
          price: product.price
        };

      }
    }

    const orderProducts = Object.values(grouped);

    const subtotal = orderProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const deliveryFee = DELIVERY_FEE;

    const total = subtotal + deliveryFee;

    const order = await Order.create({

      user: user._id,

      customerInfo: {
        fullName,
        phone,
        street,
        city,
        postalCode,
        paymentMethod
      },

      products: orderProducts,

      subtotal,

      deliveryFee,

      total
    });

    user.myProducts = [];

    await user.save();

    res.status(201).json({
      status: "success",
      message: "Order created successfully",
      data: { order }
    });

  } catch (err) {

    res.status(400).json({
      status: "error",
      message: `Error in creating order : ${err.message}`
    });

  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      message: "orders fetched successfully",
      data: { orders },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: `error in fetching orders ${err.message}`,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.product")
      .populate("user", "Name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      message: "orders fetched successfully",
      data: { orders },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: `error in fetching orders ${err.message}`,
    });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders };