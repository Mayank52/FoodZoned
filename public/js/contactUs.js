let nameInput = document.querySelector("#name");
let emailInput = document.querySelector("#email");
let findInput = document.querySelector("#find");
let feedbackInput = document.querySelector("#feedback");
let checkboxInput = document.querySelector("#checkbox");
let sendMessageBtn = document.querySelector(".form-submit");
sendMessageBtn.addEventListener("click",async (e) => {
  e.preventDefault();
  let name = nameInput.value;
  let email = emailInput.value;
  let source = findInput.value;
  let feedback = feedbackInput.value;
  let checkbox = checkboxInput.checked;
  console.log(checkboxInput.checked);
  try {
    if (checkbox && email && feedback) {
      let messageBody = {
        name,
        email,
        source,
        feedback,
        checkbox,
      };
      console.log(messageBody);
      let contactObj = await axios.post(
        "http://localhost:3000/api/user/contact",
        messageBody
      );
      console.log(contactObj);
    } else {
      console.log("Enter all Required fields");
    }
  } catch (err) {
    console.log(err);
  }
});
