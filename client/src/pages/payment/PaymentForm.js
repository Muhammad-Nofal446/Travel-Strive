import React, { useState } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_OPTIONS = {
  // iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "black" },
      "::placeholder": { color: "black" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "black",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false); //useState hook to create the success state,
  const stripe = useStripe(); //tripe variable with the useStripe hook imported from stripe-react-js
  const elements = useElements(); //elements variable that you will use in your application to collect and process user’s payment details

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardCvcElement,
        CardExpiryElement,
        CardNumberElement
      ),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:8800/payment", {
          amount: 10000,
          id,
        });

        if (response.data.success) {
          console.log("Successful Payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <div>
      {!success ? (
        <form className="myForm" onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <input
                className="nameInput"
                type="text"
                id="name"
                placeholder="Name"
                style={{ border: "none", height: "40px", outline: "none" }}
              />
            </div>
          </fieldset>

          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardNumberElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardExpiryElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardCvcElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
      ) : (
        <div className="payment-success">
          <h2>Payment successful</h2>
          <h3 className="Thank-you">Thank you for your patronage</h3>
        </div>
      )}
    </div>
  );
}
