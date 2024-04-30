const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "Ecommerce",
        },
        name: req.body.name,
        email: req.body.email,
        shipping_address: req.body.shipping_addressaddress,
        description: req.body.description,
    });

    res
        .status(200)
        .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});