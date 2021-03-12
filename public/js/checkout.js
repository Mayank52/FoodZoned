let buyPlansButton = document.querySelector(".buy-plan");
let allLis = document.querySelectorAll(".link");
let emailInput = document.querySelector("#email");
let nameInput = document.querySelector("#name");
let contactInput = document.querySelector("#contact");
let addressInput = document.querySelector("#address");
let message = document.querySelector(".message");
const stripe = Stripe(
  "pk_test_51I59kfFPKVUdiMIHQQ0jvz5gRtpOYFxNIsBfsCthH8cw8fqeuPMr57RAkYaQu8V9jWOvYgWupemKWLvylGh3JYvx00r6jIt7DL"
);

buyPlansButton.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    if (allLis.length < 6) {
      window.location.href = "/login";
    } else {
      let username = nameInput.value;
      let email = emailInput.value;
      let contact = contactInput.value;
      let address = addressInput.value;
      if (username && email && contact && address) {
        let url = window.location.href.split("/");
        let planId = url[url.length - 1];

        message.innerHTML = "Proceeding to checkout...";

        let session = await axios.post(
          "https://foodzoned--app.herokuapp.com/api/booking/createPaymentSession",
          { planId: planId }
        );
        let sessId = session.data.session.id;
        let result = await stripe.redirectToCheckout({ sessionId: sessId });
        // console.log(result);
      } else {
        message.innerHTML = "*Enter all Details";
      }
    }
  } catch (error) {
    alert(error.message);
  }
});
