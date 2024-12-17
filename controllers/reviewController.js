const Review = require("./../models/reviewModel");
const Product = require("./../models/productModel");
const User = require("./../models/userModel");

exports.getReviews = async (req, res) => {
  try {
    const completeReview = [];
    // 1. Get Reviews
    const reviews = await Review.find();

    // 2. Get Product and Customer Ids
    const productIds = reviews.map((review) => review.productId);
    const customerIds = reviews.map((review) => review.customerId);

    // 3a. Select image and name from Product based on product Ids
    const products = await Product.find({ _id: { $in: productIds } }).select(
      "image name"
    );
    // 3b. Select name from User based on customerIds
    const customer = await User.find({ _id: { $in: customerIds } }).select(
      "name"
    );

    // 4. Loop through each review and combine these information into a sinlge object
    reviews.map((review, i) => {
      const item = Object.assign(
        {},
        review._doc,
        {
          productName: products[i]._doc.name,
          productImage: products[i]._doc.image,
        },
        {
          customerName: customer[i]._doc.name,
        }
      );
      completeReview.push(item);
    });

    res.status(200).json({
      status: "success",
      length: reviews.length,
      data: completeReview,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      msg: err.message,
    });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id });
    res.status(200).json({
      status: "success",
      length: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      msg: err.message,
    });
  }
};

exports.addReview = async (req, res) => {
  try {
    const reviews = await Review.create({
      date: new Date().toISOString(),
      productId: req.body.productId,
      customerId: req.body.customerId,
      ratings: req.body.ratings,
      description: req.body.description,
    });

    res.status(200).json({
      status: "success",
      length: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      msg: err,
    });
  }
};
