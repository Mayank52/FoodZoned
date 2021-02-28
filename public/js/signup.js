let username = document.querySelector("#name");
let emailSU = document.querySelector("#emailSU");
let pwSU = document.querySelector("#pwSU");
let cpw = document.querySelector("#cpw");
let signupBtn = document.querySelector(".signupBtn");

signupBtn.addEventListener("click", async function (e) {
  try {
    e.preventDefault();
    console.log("Btn pressed");
    if (username.value && emailSU.value && pwSU.value && cpw.value) {
      let signupObject = {
        name: username.value,
        email: emailSU.value,
        password: pwSU.value,
        confirmPassword: cpw.value,
      };
      let obj = await axios.post(
        "http://localhost:3000/api/user/signup",
        signupObject
      );
      console.log(obj);
      window.location = "/login";
    }
  } catch (error) {
    console.log(error);
  }
});
