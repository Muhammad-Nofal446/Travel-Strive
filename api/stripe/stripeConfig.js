const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const PaymentPlan = require("../../models/paymentPlanModel/paymentModel");
const jwt = require("jsonwebtoken");

const MakePayment = async (req, res) => {
  debugger
  try {
    const payment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      description: "Payment",
      payment_method: req.body.id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    const token = req.headers["x-access-token"];
    const val = jwt.decode(token);
    console.log(val);
    const paymentDone = new PaymentPlan({
      userId: val.id,
      hasPaid: true,
      planSelected: parseInt(req.body.amount) / 10000,
    });
    await paymentDone
      .save()
      .then(() => console.log(`Payment  Done Successfully`));

    console.log("Payment", payment);
    res.json({
      message: "Payment was successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
};

module.exports = { MakePayment };
