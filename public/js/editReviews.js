let deleteReviewBtns = document.querySelectorAll(".delete-review i");
let editReviewBtns = document.querySelectorAll(".edit-review i");
let reviewEditBtns = document.querySelector(".review-edit-btns");
let saveReviewBtns = document.querySelectorAll(".save-review-btn button");
let cancelReviewEditBtns = document.querySelectorAll(".cancel-btn button");

let activeEditId = -1;

//Delete Review
deleteReviewBtns.forEach((deleteReviewBtn) => {
  deleteReviewBtn.addEventListener("click", async (e) => {
    try {
      // console.log(e.target);
      let reviewId = e.target.getAttribute("reviewid");
      // console.log(reviewId);
      let deletedReviewObj = await axios.delete(
        `https://foodzoned--app.herokuapp.com/api/review/${reviewId}`
      );
      // console.log(deletedReviewObj);

      let parentDiv = e.target.parentElement.parentElement;
      parentDiv.innerHTML = "Deleted!";
      // console.log(parentDiv);
    } catch (error) {
      console.log(error);
    }
  });
});

//Edit Review
editReviewBtns.forEach((editReviewBtn) => {
  editReviewBtn.addEventListener("click", async (e) => {
    try {
      //Show edit area
      //to use id as class or id, we cant use the id original id, as it may start with a number
      //but css identifiers cannot start have leading digits
      //so add an alphabet before it

      cancelEdit();
      let reviewId = e.target.getAttribute("reviewid");
      activeEditId = reviewId;
      let reviewArea = document.querySelector(`.user-review.a${reviewId}`);
      let editReviewTextBox = document.querySelector(`[id='${reviewId}']`);
      let userRating = document.querySelector(`.user-rating.a${reviewId}`);
      let newRating = document.querySelector(`#new-rating.a${reviewId}`);
      // console.log(reviewArea);
      // console.log(editReviewTextBox);
      reviewArea.style.display = "none";
      userRating.style.display = "none";
      editReviewTextBox.style.display = "block";
      newRating.style.display = "block";
      editReviewTextBox.removeAttribute("readonly");

      //save, cancel buttons
      let saveReviewBtn = document.querySelector(
        `.save-review-btn.a${reviewId}`
      );
      let cancelReviewEditBtn = document.querySelector(
        `.cancel-btn.a${reviewId}`
      );
      let mydeleteReviewBtn = document.querySelector(
        `.delete-review.a${reviewId}`
      );
      let myeditReviewBtn = document.querySelector(`.edit-review.a${reviewId}`);

      saveReviewBtn.style.display = "block";
      cancelReviewEditBtn.style.display = "block";
      mydeleteReviewBtn.style.display = "none";
      myeditReviewBtn.style.display = "none";
    } catch (error) {
      console.log(error);
    }
  });
});

saveReviewBtns.forEach((saveReviewBtn) => {
  saveReviewBtn.addEventListener("click", async (e) => {
    try {
      e.preventDefault();
      let reviewId = e.target.getAttribute("reviewid");
      let editReviewTextBox = document.querySelector(`[id='${reviewId}']`);
      let newRating = document.querySelector(`#new-rating.a${reviewId}`);

      let review = editReviewTextBox.value;
      let rating = newRating.value;
      let updateObj = {
        review: review,
        rating: rating,
      };
      // console.log(updateObj);
      let updatedReviewObj = await axios.patch(
        `https://foodzoned--app.herokuapp.com/api/review/${reviewId}`,
        updateObj
      );
      // console.log(updatedReviewObj);
        //update new review in UI
        window.location.reload();
    } catch (err) {
      console.log(err);
    }
  });
});

cancelReviewEditBtns.forEach((cancelBtn) => {
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cancelEdit();
  });
});

function cancelEdit() {
  if (activeEditId != -1) {
    let reviewId = activeEditId;

    let selector1 = `[id='${reviewId}']`;
    let selector2 = `.user-review.a${reviewId}`;
    // console.log(selector1, selector2);
    let reviewArea = document.querySelector(selector2);
    let editReviewTextBox = document.querySelector(selector1);
    let userRating = document.querySelector(`.user-rating.a${reviewId}`);
    let newRating = document.querySelector(`#new-rating.a${reviewId}`);

    reviewArea.style.display = "block";
    userRating.style.display = "block";
    editReviewTextBox.style.display = "none";
    newRating.style.display = "none";
    editReviewTextBox.setAttribute("readonly", "");

    let saveReviewBtn = document.querySelector(`.save-review-btn.a${reviewId}`);
    let cancelReviewEditBtn = document.querySelector(
      `.cancel-btn.a${reviewId}`
    );
    let mydeleteReviewBtn = document.querySelector(
      `.delete-review.a${reviewId}`
    );
    let myeditReviewBtn = document.querySelector(`.edit-review.a${reviewId}`);

    saveReviewBtn.style.display = "none";
    cancelReviewEditBtn.style.display = "none";
    mydeleteReviewBtn.style.display = "block";
    myeditReviewBtn.style.display = "block";

    activeEditId = -1;
  }
}
