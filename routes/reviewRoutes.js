const express = require("express");
const {
  getReviews,
  addReview,
  getReviewById,
} = require("../controllers/reviewController");
const router = express.Router();

router.get("/", getReviews);
router.post("/create", addReview);
router.get("/:id", getReviewById);

module.exports = router;
