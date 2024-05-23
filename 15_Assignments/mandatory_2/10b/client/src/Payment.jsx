import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const paymentHandler = async (e) => {
    e.preventDefault();

    const stripe = await stripePromise;

    try {
      const response = await axios.post("http://localhost:8080/checkout");

      if (response.data.session.id) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.data.session.id,
        });

        if (error) {
          console.log("Could not redirect:", error);
        }
      } else {
        console.log("No session ID");
      }
    } catch (error) {
      console.error("Could not create checkout session:", error);
    }
  };

  return (
    <div>
      <h1>Make a payment</h1>
      <button onClick={paymentHandler}>Buy a T shirt</button>
    </div>
  );
};

export default Payment;
