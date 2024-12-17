const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

exports.getOrders = async (req, res) => {
  try {
    const order = await Order.find();
    const product = await Product.find();
    const user = await User.find();

    res.status(200).json({
      status: "success",
      length: order.length,
      data: [...order],
      productLength: product.length,
      userLength: user.length,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getOrdersById = async (req, res) => {
  try {
    const order = await Order.find({
      customerId: req.params.customerId,
    });

    const user = await User.findById({
      _id: req.params.customerId,
    }).select("name email");

    const combined = Object.assign({}, order[0]._doc, {
      name: user.name,
      email: user.email,
    });

    res.status(200).json({
      status: "success",
      length: order.length,
      data: [combined],
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      date: new Date().toISOString(),
      customerId: req.body.customerId,
      products: req.body.products,
      totalPrice: req.body.totalPrice,
      tax: req.body.tax,
      status: req.body.status,
    });

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      msg: err.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.updateOne(
      { _id: req.params.orderId },
      { status: req.body.status }
    );

    console.log(req.params.orderId);

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      msg: err,
    });
  }
};
