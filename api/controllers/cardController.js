// const stripe = require('stripe')("sk_test_51OMaOtHrGE41d8siTe4RbMy3LEObxNvT0FEdGlHfR6XZ5zrtVBzKTcV2p6ItorDF80FYfe1wNVXNa3GGyBedLVFH00nE8cMNKf");
// import jwt from "jsonwebtoken";
// import payment from '../models/payment.js';

// // const stripeInstance = stripe(process.env.STRIPE_KEY);
// // const stripeInstance = create(process.env.STRIPE_KEY);

// export const paymentIndent = async (req, res, next) => {
//     debugger
//     const { body } = req
//     console.log(body)
//     res.json({ clientSecret: process.env.STRIPE_KEY })
// };


// export async function createPaymentIntent(req, res) {
//     debugger
//     // const { amount, currency } = req.body

//     try {

//         // const token = req.headers["authorization"];
//         // const val = jwt.decode(token);
//         // console.log(val);
//         // const paymentDone = new payment({
//         //     userId: val.id,
//         //     hasPaid: true,
//         //     planSelected: parseInt(req.body.amount) / 10000,
//         // });

//         const paymentIntent = await stripe.paymentIntents.create({
//             amoun: 100,
//             currency: 100,
//         });

//         // res.json(paymentIntent)
//         // const paymentIntent = await stripeInstance.paymentIntents.create({
//         //     amount: req.body.amount,
//         //     currency: "USD",
//         //     description: "Payment",
//         //     payment_method: req.body.id,
//         //     confirm: true,
//         //     automatic_payment_methods: {
//         //         enabled: true,
//         //         allow_redirects: "never",
//         //     },
//         // });

//         // const session = await stripeInstance.checkout.sessions.create({
//         //     line_items: [
//         //         {
//         //             price_data: {
//         //                 currency: 'usd',
//         //                 product_data: {
//         //                     name: 'T-shirt',
//         //                 },
//         //                 unit_amount: 2000,
//         //             },
//         //             quantity: 1,
//         //         },
//         //     ],
//         //     mode: 'payment',
//         //     success_url: 'http://localhost:3000',
//         //     cancel_url: 'http://localhost:3000',
//         // });

//         // res.json({ client_secret: paymentIntent.client_secret });
//     } catch (error) {
//         console.error('Error creating PaymentIntent:', error.message);
//         throw error;
//     }
// }

// export const helloStripe = async (req, res) => {
//     res.json({ name: "hello stripe" })

// }



