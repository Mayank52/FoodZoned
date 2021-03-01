let planList = document.querySelector(".plan-list");
let planItems = document.querySelectorAll(".plan-item");
let planName = document.querySelector(".plan-details .name");
let stars = document.querySelectorAll(".plan-details .stars i");
let reviewCount = document.querySelector(".plan-details .review-count .count");
let price = document.querySelector(".plan-details .price-amount");
let reviewsDiv = document.querySelector(".reviews");
let buyPlanButton = document.querySelector(".pricing-btn button");
let lastSelectedPlan = planItems[0];

planItems.forEach((planItem) => {
  planItem.addEventListener("click", (e) => {
    console.log("planitem");
    let id = planItem.id;

    lastSelectedPlan.classList.remove("active");
    e.target.classList.add("active");
    lastSelectedPlan = e.target;

    setValues(id);
  });
});

async function setValues(id) {
  try {
    // let id = lastSelectedPlan.id;
    let planObj = await axios.get(`http://localhost:3000/api/plans/${id}`);
    console.log("Plan :", planObj);
    let plan = planObj.data.data;
    console.log(plan);

    //add active class to selected plan

    // set values in details model
    planName.innerHTML = plan.name;
    reviewCount.innerHTML = plan.totalReviews;
    price.innerHTML = `$${plan.price}`;
    buyPlanButton.setAttribute("planId", `${id}`);
    let starCount = plan.rating;
    console.log("rating: ",plan.rating);
    for (let i = 0; i < Math.floor(starCount); i++) {
      stars[i].style.color = "yellow";
    }
    for (let i = Math.floor(starCount) ; i < 5; i++) {
      stars[i].style.color = "lightgrey";
    }

    let reviewObj = await axios.get(
      `http://localhost:3000/api/review/plan/${id}`
    );
    console.log(reviewObj);
    let reviews = reviewObj.data.data;

    if (reviews.length > 0) reviewsDiv.innerHTML = "";
    reviews.forEach((review) => {
      let createdOn = review.createdOn.split("T")[0];
      let reviewTag = `<div class="review">
            <div class="user">
            <div class="username">${review.username}</div>
            <div class="date">${createdOn}</div>
            </div>
            <div class="review-stars">
            ${review.rating}/5
            </div>
            <div class="review-text">
              ${review.review}
              </div>
          </div>`;

      reviewsDiv.innerHTML += reviewTag;
    });
  } catch (error) {
    console.log(error);
  }
}

setValues(lastSelectedPlan.id);
lastSelectedPlan.classList.add("active");