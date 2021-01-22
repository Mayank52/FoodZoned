const planModel = require("../Model/plansModel");
const reviewModel = require("../Model/reviewModel");
const bookingModel = require("../Model/bookingModel");

async function getHomePage(req, res) {
  try {
    let plans = await planModel.find();
    plans = plans.splice(0, 3);
    res.render("homepage.pug", { name: req.name, plans });
  } catch (error) {
    console.log(error);
  }
}

async function getProfilePage(req, res) {
  try {
    // console.log(req.user);
    let userId = req.user._id;
    let orderObj = await bookingModel.find({ userId: userId }).exec();
    let orders = orderObj[0].bookedPlans;
    let reviews = await reviewModel.find({ userId: userId }).exec();
    res.render("profilePage.pug", {
      user: req.user,
      name: req.name,
      orders: orders,
      reviews: reviews,
    });
  } catch (error) {
    console.log(error);
  }
}

function getResetPasswordPage(req, res) {
  res.render("resetPassword.pug", { name: req.name });
}

function getLoginPage(req, res) {
  res.render("login.pug", { name: req.name });
}

function getSignUpPage(req, res) {
  res.render("signup.pug", { name: req.name });
}

async function getPlansPage(req, res) {
  try {
    let plans = await planModel.find();
    console.log(plans);
    res.render("plans.pug", { name: req.name, plans: plans });
  } catch (error) {
    console.log(error);
  }
}

async function getReviewsPage(req, res) {
  try {
    let reviews = await reviewModel.find();
    console.log(reviews);
    res.render("reviews.pug", { reviews: reviews });
  } catch (error) {
    console.log(error);
  }
}

module.exports.getHomePage = getHomePage;
module.exports.getLoginPage = getLoginPage;
module.exports.getSignUpPage = getSignUpPage;
module.exports.getPlansPage = getPlansPage;
module.exports.getResetPasswordPage = getResetPasswordPage;
module.exports.getProfilePage = getProfilePage;
module.exports.getReviewsPage = getReviewsPage;
