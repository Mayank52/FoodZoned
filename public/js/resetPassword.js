let resetBtn = document.querySelector(".reset-pw");
let newPw = document.querySelector(".new-pw");
let confirmPw = document.querySelector(".confirm-pw");
let message = document.querySelector(".message");

resetBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("Clicked");
  let newVal = newPw.value;
  let confirmVal = confirmPw.value;
  if (newVal === confirmVal) {
    let pathname = window.location.href.split("/");
    let token = pathname[pathname.length - 1];
    console.log(token);
    let obj = await axios.patch(
      `http://localhost:3000/api/user/resetpassword/${token}`,
      { password: newVal, confirmPassword: confirmVal }
    );
    console.log(obj);
    message.innerHTML = obj.data.message;
  } else {
    console.log("New and confirm password values dont match!!!");
  }
});
