const planModel = require("../Model/plansModel");
const reviewModel = require("../Model/reviewModel");
const bookingModel = require("../Model/bookingModel");
const userModel = require("../Model/usersModel");

async function getHomePage(req, res) {
  try {
    let plans = await planModel.find();
    let reviews = await reviewModel.find();
    plans = plans.splice(0, 3);
    reviews = reviews.splice(0, 3);
    res.render("homepage.pug", { name: req.name, plans, reviews });
  } catch (error) {
    console.log(error);
  }
}

async function getProfilePage(req, res) {
  try {
    let userId = req.user._id;
    let orderObj = await bookingModel.find({ userId: userId }).exec();
    let orders = [],
      reviews = [];
    if (orderObj.length != 0) {
      orders = orderObj[0].bookedPlans;
    }
    reviews = await reviewModel.find({ userId: userId }).exec();
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
    res.render("planDetails.pug", { name: req.name, plans: plans });
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

async function getCheckoutPage(req, res) {
  try {
    let userId = req.user._id;
    let userObj = await userModel.find({ _id: userId }).exec();

    res.render("checkout.pug", { name: req.name, user:userObj[0] });
  } catch (err) {
    console.log(err);
  }
}

module.exports.getHomePage = getHomePage;
module.exports.getLoginPage = getLoginPage;
module.exports.getSignUpPage = getSignUpPage;
module.exports.getPlansPage = getPlansPage;
module.exports.getResetPasswordPage = getResetPasswordPage;
module.exports.getProfilePage = getProfilePage;
module.exports.getReviewsPage = getReviewsPage;
module.exports.getCheckoutPage = getCheckoutPage;
