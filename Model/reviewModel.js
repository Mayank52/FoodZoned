const mongoose = require("mongoose");
const { DB_LINK } = require("../config/secrets");

// const DB_LINK = process.env.DB_LINK;
mongoose
  .connect(DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => {
    console.log("Connected to db for reviews!!!");
  });

//Review Schema
const reviewSchema = new mongoose.Schema({
  planId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

const reviewModel = mongoose.model("reviewcollection", reviewSchema);
module.exports = reviewModel;
