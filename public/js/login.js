let email = document.querySelector("#email");
let pw = document.querySelector("#pw");
let loginBtn = document.querySelector(".loginBtn");
let message = document.querySelector("#message");
let forgetPassword = document.querySelector(".forgetPassword");

forgetPassword.addEventListener("click", async function (e) {
  try {
    e.preventDefault();
    if (email.value) {
      let obj = await axios.post(
        "https://foodzoned--app.herokuapp.com/api/user/forgetpassword",
        { email: email.value }
      );
      console.log(obj);
      message.innerHTML = "Reset Link sent to Email";
    } else {
      message.innerHTML = "Enter Valid Email";
    }
  } catch (error) {
    console.log(error);
    message.innerHTML = "Enter Valid Email";
  }
});

loginBtn.addEventListener("click", async function (e) {
  try {
    e.preventDefault(); // prevent page refresh
    if (email.value && pw.value) {
      let obj = await axios.post(
        "https://foodzoned--app.herokuapp.com/api/user/login",
        {
          email: email.value,
          password: pw.value,
        }
      );
      console.log(obj);
      if (obj.data.data) {
        window.location.href = "/";
      } else {
        message.innerHTML = obj.data.message;
      }
    }
  } catch (error) {
    console.log(error);
  }
});
