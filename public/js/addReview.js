let addReviewBtn = document.querySelector(".add-review button");
let reviewTextArea = document.querySelector(".new-review");
let ratingSelectBox = document.querySelector(".new-review-rating select");

//add Review
addReviewBtn.addEventListener("click", async (e) => {
  try {
    let review = reviewTextArea.value;
    let rating = ratingSelectBox.value;

    //Currently selected plan has a active class
    let selectedPlan = document.querySelector(".plan-item.active");
    let planId = selectedPlan.id;
    console.log(review, rating, planId);
    let newReviewObj = {
      planId: planId,
      review: review,
      rating: rating,
    };

    console.log(newReviewObj);
    let reviewObj = await axios.post(
      "https://foodzoned--app.herokuapp.com/api/review",
      newReviewObj
    );
    console.log(reviewObj);

    //update new review in UI
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
});