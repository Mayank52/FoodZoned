const planModel = require("../Model/plansModel");
const reviewModel = require("../Model/reviewModel");
const userModel = require("../Model/usersModel");

async function createReview(req, res) {
  try {
    let sentReview = req.body;
    console.log("Review0: ", sentReview);

    let userId = req.id;
    let user = await userModel.findById(userId);
    sentReview.userId = userId;
    sentReview.username = user.name;
    console.log("Review1: ", sentReview);

    let review = await reviewModel.create(sentReview);

    //update plan rating
    let { planId } = sentReview;
    let plan = await planModel.findById(planId);
    let { rating, totalReviews } = plan;

    console.log(rating, totalReviews, sentReview.rating);

    let newRating =
      (rating * totalReviews + parseInt(sentReview.rating)) /
      (totalReviews + 1);

    console.log(
      rating * totalReviews,
      rating * totalReviews + sentReview.rating
    );

    console.log(newRating);

    plan.rating = newRating;
    plan.totalReviews = totalReviews + 1;

    let updatedPlan = await plan.save();

    res.status(200).json({
      message: "Review Created Sucessfully!!",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create review.",
      error,
    });
  }
}

async function updateReviewById(req, res) {
  try {
    let id = req.params.id;
    let { updateObj } = req.body;
    let review = await reviewModel.findById(id);
    let newRating = updateObj.rating;
    let oldRating = review.rating;
    console.log(review);

    for (key in updateObj) {
      review[key] = updateObj[key];
    }

    //update plan rating
    let { planId } = review;
    let plan = await planModel.findById(planId);
    let { rating, totalReviews } = plan;
    let updatedRating =
      (rating * totalReviews + newRating - oldRating) / totalReviews;
    plan.rating = updatedRating;
    let updatedPlan = await plan.save();

    let updatedReview = await review.save();

    res.status(200).json({
      message: "Review Updated Sucessfully!!",
      data: updatedReview,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to update review.",
      error,
    });
  }
}

async function getAllReviews(req, res) {
  try {
    let reviews = await reviewModel.find({});

    res.status(200).json({
      message: "Got All reviews successfully!",
      data: reviews,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to get reviews.",
      error,
    });
  }
}

async function getReviewsByPlanId(req, res) {
  try {
    let id = req.params.id;

    let reviews = await reviewModel.find({ planId: id }).exec();

    res.status(200).json({
      message: "Got plans reviews",
      data: reviews,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to get review.",
      error,
    });
  }
}

async function getReviewsByUserId(req, res) {
  try {
    let id = req.params.id;
    console.log(id);

    let reviews = await reviewModel.find({ userId: id }).exec();
    console.log(reviews);
    res.status(200).json({
      message: "Got reviews successfully!",
      data: reviews,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to get review.",
      error,
    });
  }
}

async function deleteReviewById(req, res) {
  try {
    let id = req.params.id;
    let deletedReview = await reviewModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Review Deleted Sucessfully!!",
      data: deletedReview,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to delete review.",
      error,
    });
  }
}

module.exports.createReview = createReview;
module.exports.updateReviewById = updateReviewById;
module.exports.deleteReviewById = deleteReviewById;
module.exports.getReviewsByPlanId = getReviewsByPlanId;
module.exports.getReviewsByUserId = getReviewsByUserId;
module.exports.getAllReviews = getAllReviews;
