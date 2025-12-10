const productReviews = require("../models/productReviews");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  let reviews = [];
  try {
    if (
      req.query.productId !== undefined &&
      req.query.productId !== null &&
      req.query.productId !== ""
    ) {
      reviews = await productReviews.find({ productId: req.query.productId });
    } else {
      reviews = await productReviews.find();
    }
    if (!reviews) {
      res.status(500).json({ success: false });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
  }
});

router.get(`/:id`, async (req, res) => {
  const review = await productReviews.findById(req.params.id);
  if (!review) {
    res
      .status(500)
      .json({ message: "The Review With The Given ID Was Not Found ." });
  }
  return res.status(200).send(review);
});

//=============================================
// 🟢 Get The Count Of  A Review
//=============================================
router.get("/get/count", async (req, res) => {
  const productReviewsCount = await productReviews.countDocuments();
  if (!productReviewsCount) {
    return res.status(500).json({ success: false });
  }
  return res.send({
    productReviewsCount: productReviewsCount,
  });
});
//=============================================
// 🟢 Get The Count Of  A Review
//=============================================
router.post("/add", async (req, res) => {
  if (!req.body.review || req.body.review.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Review text is required",
    });
  }

  let review = new productReviews({
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    review: req.body.review,
    customerRating: req.body.customerRating,
    productId: req.body.productId,
  });

  review = await review.save();
  return res.status(201).json(review);
});

module.exports = router;
