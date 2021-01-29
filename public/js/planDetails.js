let showDetails = document.querySelectorAll(".details-btn button");
let planName = document.querySelector(".plan-details .name");
let stars = document.querySelectorAll(".plan-details .stars i");
let reviewCount = document.querySelector(".plan-details .review-count .count");
let price = document.querySelector(".plan-details .price-amount");
let reviewsDiv = document.querySelector(".reviews");

showDetails.forEach((btn) => {
  btn.addEventListener("click", async () => {
    console.log(btn);
    let id = btn.getAttribute("planid");
    let planObj = await axios.get(`http://localhost:3000/api/plans/${id}`);
    console.log("Plan :", planObj);
    let plan = planObj.data.data;
    console.log(plan);

    // set values in details model
    planName.innerHTML = plan.name;
    reviewCount.innerHTML = plan.totalReviews;
    price.innerHTML = `$${plan.price}`;
    let starCount = plan.rating;
    for (let i = 0; i < Math.floor(starCount) / 2; i++) {
      stars[i].style.color = "yellow";
    }

    let reviewObj = await axios.get(
      `http://localhost:3000/api/review/plan/${id}`
    );
    console.log(reviewObj);
    let reviews = reviewObj.data.data;

    if(reviews.length>0) reviewsDiv.innerHTML=""; 
    reviews.forEach((review) => {
      let reviewTag = `<div class="review">
      <div class="user">
        <div class="username">${review.username}</div>
        <div class="date">${review.createdOn}</div>
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
  });
});
