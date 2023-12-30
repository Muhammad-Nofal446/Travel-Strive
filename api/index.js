import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import taxiRoute from "./routes/taxiRoute.js";
import taxiBookingRoute from "./routes/taxiBookingRoute.js";
import stripeRoute from "./routes/stripe.js"

import cookieParser from "cookie-parser";
import cors from "cors";


// import { MakePayment } from "./stripe/stripeConfig.js";

const app = express();
dotenv.config();

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

// mongoose.connection.on("disconnected", () => {
//   console.log("mongoDB disconnected!");
// });

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api", taxiRoute);
app.use("/api", taxiBookingRoute);
app.use("/stripe-form", stripeRoute)

app.post('/create-payment-intent', async (req, res) => {
  debugger
  const { paymentMethodType, currency, paymentMethodOptions } = req.body;

  // Each payment method type has support for different currencies. In order to
  // support many payment method types and several currencies, this server
  // endpoint accepts both the payment method type and the currency as
  // parameters. To get compatible payment method types, pass 
  // `automatic_payment_methods[enabled]=true` and enable types in your dashboard 
  // at https://dashboard.stripe.com/settings/payment_methods.
  //
  // Some example payment method types include `card`, `ideal`, and `link`.
  const params = {
    payment_method_types: paymentMethodType === 'link' ? ['link', 'card'] : [paymentMethodType],
    amount: 5999,
    currency: currency,
  }

  // If this is for an ACSS payment, we add payment_method_options to create
  // the Mandate.
  if (paymentMethodType === 'acss_debit') {
    params.payment_method_options = {
      acss_debit: {
        mandate_options: {
          payment_schedule: 'sporadic',
          transaction_type: 'personal',
        },
      },
    }
  } else if (paymentMethodType === 'konbini') {
    /**
     * Default value of the payment_method_options
     */
    params.payment_method_options = {
      konbini: {
        product_description: 'Tシャツ',
        expires_after_days: 3,
      },
    }
  } else if (paymentMethodType === 'customer_balance') {
    params.payment_method_data = {
      type: 'customer_balance',
    }
    params.confirm = true
    params.customer = req.body.customerId || await stripe.customers.create().then(data => data.id)
  }

  /**
   * If API given this data, we can overwride it
   */
  if (paymentMethodOptions) {
    params.payment_method_options = paymentMethodOptions
  }

  // Create a PaymentIntent with the amount, currency, and a payment method type.
  //
  // See the documentation [0] for the full list of supported parameters.
  //
  // [0] https://stripe.com/docs/api/payment_intents/create
  try {
    const paymentIntent = await stripe.paymentIntents.create(params);

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
      nextAction: paymentIntent.next_action,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});
// app.use("/makepayment", MakePayment);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
