let deleteReviewBtns = document.querySelectorAll(".delete-review button");
let editReviewBtns = document.querySelectorAll(".edit-review button");
let reviewTextArea = document.querySelector(".new-review");
let ratingSelectBox = document.querySelector(".new-review-rating select");

//Delete Review
deleteReviewBtns.forEach((deleteReviewBtn) => {
  deleteReviewBtn.addEventListener("click", async (e) => {
    try {
      // console.log(e.target);
      let reviewId = e.target.getAttribute("reviewid");
      // console.log(e.target.getAttribute("reviewid"));
      console.log(reviewId);
      let deletedReviewObj = await axios.delete(
        `http://localhost:3000/api/review/${reviewId}`
      );
      console.log(deletedReviewObj);
    } catch (error) {
      console.log(error);
    }
  });
});

//Edit Review
editReviewBtns.forEach((editReviewBtn) => {
  editReviewBtn.addEventListener("click", async (e) => {
    try {
      console.log("Edit Review btn");
      let review = reviewTextArea.value;
      let rating = ratingSelectBox.value;
      let reviewId = e.target.getAttribute("reviewid");

      //Currently selected plan has a active class
      console.log(review, rating,reviewId);
      let updateReviewObj = {
        review: review,
        rating: rating,
      };

      console.log(updateReviewObj);
      let updatedReviewObj = await axios.patch(
        `http://localhost:3000/api/review/${reviewId}`,
        newReviewObj
      );
      console.log(updatedReviewObj);

      //update new review in UI
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  });
});

console.log(deleteReviewBtns);