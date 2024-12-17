const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  products: {
    type: Object,
    require: true,
  },
  totalPrice: {
    type: Number,
    require: true,
  },
  tax: {
    type: Number,
    require: true,
  },
  status: String,
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
