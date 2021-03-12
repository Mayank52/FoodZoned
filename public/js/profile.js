let profileNav = document.querySelector(".profile-nav");
let profile = document.querySelector(".profile-details");
let orders = document.querySelector(".order-history");
let reviews = document.querySelector(".review-history");
let editDetails = document.querySelector(".edit-details");
let saveDetails = document.querySelector(".save-details");
let cancelBtn = document.querySelector(".cancel");
let profileInput = document.querySelectorAll(".profile-data input");
let navItems = [profile, orders, reviews];
let initialDetails = [];

profileNav.addEventListener("click", (e) => {
  let item = e.target.id;
  // console.log(item);
  let obj = document.querySelector(`.${item}`);
  // console.log(obj);

  profile.classList.remove("hide");
  orders.classList.remove("hide");
  reviews.classList.remove("hide");

  navItems.map((navItem) => {
    if (obj != navItem) navItem.classList.add("hide");
  });
});

editDetails.addEventListener("click", () => {
  profileInput.forEach((input) => {
    input.removeAttribute("readonly");
  });

  editDetails.classList.add("hide");
  saveDetails.classList.remove("hide");
  cancelBtn.classList.remove("hide");
});

saveDetails.addEventListener("click", async () => {
  if (profileInput[0].hasAttribute("readonly") === false) {
    //Update Details in DB
    let updateObj = {
      name: profileInput[0].value,
      email: profileInput[1].value,
      address: profileInput[2].value,
      contact: profileInput[3].value,
    };
    // console.log("Update:", updateObj);
    let obj = await axios.patch(
      "https://foodzoned--app.herokuapp.com/api/user",
      {
        updateObj,
      }
    );
    // console.log("Updated obj: ", obj);
    if (obj.data.message) window.location.reload();

    //Make them readonly
    profileInput.forEach((input) => {
      input.setAttribute("readonly", "");
    });

    // saveInputValues();

    saveDetails.classList.add("hide");
    cancelBtn.classList.add("hide");
    editDetails.classList.remove("hide");
  }
});

cancelBtn.addEventListener("click", () => {
  for (let i = 0; i < profileInput.length; i++) {
    profileInput[i].value = initialDetails[i];
  }

  saveDetails.classList.add("hide");
  cancelBtn.classList.add("hide");
  editDetails.classList.remove("hide");
});

function saveInputValues() {
  for (let i = 0; i < profileInput.length; i++) {
    initialDetails[i] = profileInput[i].value;
  }

  // console.log("Initial Details:", initialDetails);
}

saveInputValues();
