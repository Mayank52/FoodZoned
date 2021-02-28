let nameInput = document.querySelector("#name");
let emailInput = document.querySelector("#email");
let findInput = document.querySelector("#find");
let feedbackInput = document.querySelector("#feedback");
let checkboxInput = document.querySelector("#checkbox");
let sendMessageBtn = document.querySelector(".form-submit");
sendMessageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let name = nameInput.value;
  let email = emailInput.value;
  let find = findInput.value;
  let feedback = feedbackInput.value;
  let checkbox = checkboxInput.checked;
  console.log(checkboxInput.checked);
  try {
    // if (checkbox && email && feedback) {
      let message = {
        name,
        email,
        find,
        feedback,
        checkbox,
      };
      console.log(message);
      //   let contactObj = axios.post("http://localhost:3000/api/user/contact", message);
      //   console.log(contactObj);
    // }
    // else{

    // }
  } catch (err) {
    console.log(err);
  }
});
