// import React from "react";
// import {
//   CardElement,
//   CardElem,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import ToastEmitter from "../../components/notification/Notification";

// function PaymentForm() {
//   debugger;

//   const elements = useElements();
//   const stripe = useStripe();

//   const handleSubmit = async (e) => {
//     debugger;
//     const accessToken = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("access_token="))
//       .split("=")[1];
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     console.log(cardElement);
//     console.log(stripe);

//     const { error, backendError, client_secret } = await fetch(
//       "http://localhost:8800/create-payment-intent",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: accessToken,
//         },
//         body: JSON.stringify({
//           paymentMethodType: "acss_debit",
//           currency: "eur",
//           amount: 1000,
//         }),
//       }
//     ).then((res) => res.json());
//     ToastEmitter({ msg: "payment intent created", type: "success" });

//     const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });
//     if (paymentIntent.error) {
//       console.log(paymentIntent.error);
//     }

//     ToastEmitter({
//       msg: paymentIntent.id + " " + paymentIntent.status,
//       type: "success",
//     });
//   };
//   return (
//     <div className="container-fluid">
//       <h1>Card</h1>
//       <div className="border p-2">
//         <form onSubmit={handleSubmit}>
//           <div className="mt-2 mb-2">
//             <label className="mt-2 mb-2" htmlFor="card-element">
//               Card
//             </label>
//             <CardElement id="card-element" />
//           </div>
//           <div className="mt-4 text-end">
//             <button className="btn btn-sm btn-primary">Pay</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PaymentForm;

import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StatusMessages, { useMessages } from "./StatusMessages";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [messages, addMessage] = useMessages();

  const handleSubmit = async (e) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      addMessage("Stripe.js has not yet loaded.");
      return;
    }

    const { error: backendError, clientSecret } = await fetch(
      "/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodType: "card",
          currency: "usd",
        }),
      }
    ).then((r) => r.json());

    if (backendError) {
      addMessage(backendError.message);
      return;
    }

    addMessage("Client secret returned");

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Jenny Rosen",
          },
        },
      });

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      addMessage(stripeError.message);
      return;
    }

    // Show a success message to your customer
    // There's a risk of the customer closing the window before callback
    // execution. Set up a webhook or plugin to listen for the
    // payment_intent.succeeded event that handles any business critical
    // post-payment actions.
    addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
  };

  return (
    <>
      <h1>Card</h1>

      <p>
        <h4>
          Try a{" "}
          <a
            href="https://stripe.com/docs/testing#cards"
            target="_blank"
            rel="noopener noreferrer"
          >
            test card
          </a>
          :
        </h4>
        <div>
          <code>4242424242424242</code> (Visa)
        </div>
        <div>
          <code>5555555555554444</code> (Mastercard)
        </div>
        <div>
          <code>4000002500003155</code> (Requires{" "}
          <a
            href="https://www.youtube.com/watch?v=2kc-FjU2-mY"
            target="_blank"
            rel="noopener noreferrer"
          >
            3DSecure
          </a>
          )
        </div>
      </p>

      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="card">Card</label>
        <CardElement id="card" />

        <button type="submit">Pay</button>
      </form>
      <StatusMessages messages={messages} />

      <p>
        {" "}
        <a href="https://youtu.be/IhvtIbfDZJI" target="_blank">
          Watch a demo walkthrough
        </a>{" "}
      </p>
    </>
  );
};

export default PaymentForm;
