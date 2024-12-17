const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  productId: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
