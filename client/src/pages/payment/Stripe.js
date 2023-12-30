import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

// const key = ();
// console.log(key);s
const stripePromise = loadStripe(
  "pk_test_51O5ZIHJZh517so8kVmHJAsuSyaeMR92wVMjB22hBLy5a1v1AKNopcYSJuMVDKArFsSSR4XCgrWzDMv4sd8INHwH500H3zqjWop"
);

function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default Stripe;
