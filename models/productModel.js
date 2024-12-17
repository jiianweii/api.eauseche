const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  colours: Array,
  size: Array,
  description: String,
  image: String,
  gender: String,
  ageGroup: String,
  type: String,
  maxQuantity: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
