import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51O5ZIHJZh517so8kVmHJAsuSyaeMR92wVMjB22hBLy5a1v1AKNopcYSJuMVDKArFsSSR4XCgrWzDMv4sd8INHwH500H3zqjWop"
);
function StripeApp() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

export default StripeApp;
