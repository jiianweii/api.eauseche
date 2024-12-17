const express = require("express");
const {
  getAllProducts,
  getProductByGender,
  getProductById,
  addProduct,
  removeProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/:gender/:id").get(getProductById);
router.route("/:gender").get(getProductByGender);
router.route("/add").post(addProduct);
router.route("/remove").delete(removeProduct);
router.route("/update").patch(updateProduct);

module.exports = router;
