import "dotenv/config";
import Stripe from "stripe";
import express from "express";
import cors from "cors";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "dkk",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });
  res.send({ session });
});

app.listen(8080, () =>
  console.log("Server is running on http://localhost:8080")
);
