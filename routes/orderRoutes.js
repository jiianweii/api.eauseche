const express = require("express");
const {
  getOrders,
  createOrder,
  getOrdersById,
  updateOrder,
} = require("../controllers/orderController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").get(getOrders);

router.route("/:customerId").get(protect, getOrdersById);
router.route("/order/:orderId").post(updateOrder);
router.route("/add").post(createOrder);

module.exports = router;
