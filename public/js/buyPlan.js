let buyPlansButtons = document.querySelectorAll(".pricing-btn button");
let allLis = document.querySelectorAll(".link");

for (let i = 0; i < buyPlansButtons.length; i++) {
  buyPlansButtons[i].addEventListener("click", function (e) {
    if (allLis.length < 6) {
      window.location.href = "/login";
    } else {
      let planId = buyPlansButtons[i].getAttribute("planid");
      window.location.href = `/checkout/${planId}`;
    }
  });
}
