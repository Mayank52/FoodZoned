let buyPlansButtons = document.querySelectorAll(".pricing-btn button");
// let showDetailsButtons = document.querySelectorAll(".details-btn button");
let allLis = document.querySelectorAll(".link");
const stripe = Stripe(
  "pk_test_51I59kfFPKVUdiMIHQQ0jvz5gRtpOYFxNIsBfsCthH8cw8fqeuPMr57RAkYaQu8V9jWOvYgWupemKWLvylGh3JYvx00r6jIt7DL"
);

for (let i = 0; i < buyPlansButtons.length; i++) {
  buyPlansButtons[i].addEventListener("click", async function () {
    try {
      if (allLis.length < 6) {
        window.location.href = "/login";
      } else {
        let planId = buyPlansButtons[i].getAttribute("planid");
        let session = await axios.post(
          "https://foodzoned--app.herokuapp.com/api/booking/createPaymentSession",
          { planId: planId }
        );
        let sessId = session.data.session.id;
        let result = await stripe.redirectToCheckout({ sessionId: sessId });
        console.log(result);
      }
    } catch (error) {
      alert(error.message);
    }
  });
}