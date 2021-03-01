const express = require("express");
const { protectRoute } = require("../Controller/authController");
const {
  createReview,
  deleteReviewById,
  updateReviewById,
  getReviewsByPlanId,
  getReviewsByUserId,
  getAllReviews,
} = require("../Controller/reviewController");
const reviewRouter = express.Router();

reviewRouter
  .route("")
  .get(protectRoute, getAllReviews)
  .post(protectRoute, createReview);
reviewRouter
  .route("/:id")
  .patch(protectRoute, updateReviewById)
  .delete(protectRoute, deleteReviewById);

reviewRouter.route("/plan/:id").get(getReviewsByPlanId);
reviewRouter.route("/user/:id").get(protectRoute, getReviewsByUserId);

module.exports = reviewRouter;
