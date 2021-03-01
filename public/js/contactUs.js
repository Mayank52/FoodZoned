let nameInput = document.querySelector("#name");
let emailInput = document.querySelector("#email");
let findInput = document.querySelector("#find");
let feedbackInput = document.querySelector("#feedback");
let checkboxInput = document.querySelector("#checkbox");
let sendMessageBtn = document.querySelector(".form-submit");
let messageDiv = document.querySelector(".message");
sendMessageBtn.addEventListener("click", async (e) => {
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
        "https://foodzoned--app.herokuapp.com/api/user/contact",
        messageBody
      );
      // console.log(contactObj);
      messageDiv.innerHTML =
        "Thank you for your time. We will get back to you soon!";
    } else {
      messageDiv.innerHTML = "Enter all Required Fields";
      console.log("Enter all Required fields");
    }
  } catch (err) {
    console.log(err);
  }
});
