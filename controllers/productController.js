const Product = require("./../models/productModel");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      length: products.length,
      data: [...products],
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
// Search By Gender
exports.getProductByGender = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excluded = ["page", "sort", "limit", "fields"];
    excluded.forEach((ex) => delete queryObj[ex]);

    let query = Product.find(queryObj)
      .where("gender")
      .equals(
        req.params.gender.charAt(0).toUpperCase() + req.params.gender.slice(1)
      )
      .where("ageGroup")
      .equals("Adult");

    if (req.params.gender == "kids" || req.params.gender == "toddlers") {
      query = Product.find(queryObj)
        .where("ageGroup")
        .equals(
          req.params.gender.charAt(0).toUpperCase() + req.params.gender.slice(1)
        );
    }

    // IF SORT EXISTS
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    // PAGINATION
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;

    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const totalItems = await Product.countDocuments({
      ...queryObj,
      gender:
        req.params.gender.charAt(0).toUpperCase() + req.params.gender.slice(1),
    });

    const products = await query;

    res.status(200).json({
      status: "success",
      totalPages: Math.ceil(totalItems / limit),
      length: products.length,
      data: [...products],
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Search by Id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product)
      res.status(200).json({
        status: "success",
        length: product.length,
        data: product,
      });
    else
      res.status(204).json({
        status: "fail",
        message: "Id cannot be found",
      });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      colours: req.body.colours,
      size: req.body.size,
      description: req.body.description,
      image: req.body.image,
      gender: req.body.gender,
      ageGroup: req.body.ageGroup,
      type: req.body.type,
      maxQuantity: req.body.maxQuantity,
    });

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      msg: err,
    });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        price: req.body.price,
        colours: req.body.colours,
        size: req.body.size,
        description: req.body.description,
        image: req.body.image,
        gender: req.body.gender,
        ageGroup: req.body.ageGroup,
        type: req.body.type,
        maxQuantity: req.body.maxQuantity,
      },
      {
        new: true, // Returns the updated document
        runValidators: true, // Ensures validation rules are applied during update
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      msg: err,
    });
  }
};

// Remove Product
exports.removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.body._id);

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      msg: err,
    });
  }
};
