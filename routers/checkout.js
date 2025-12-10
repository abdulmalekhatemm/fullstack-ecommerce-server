// const { model } = require('mongoose');
// const {Orders } = require('../models/orders');
// const express  = require('express');
// const router  = express.Router();
// const stripe = require('stripe')(process.env.STRIPE_STRIPE_KEY);

// router.post('/',async  (req , res )=>{
//     const products = req.body.products ;
//     const countryList = [];

//     req.body.country.map((item)=> {
//         countryList.push(item.country);
//     });

//     const lineItems = products.map((product)=>({
//         price_data:{
//             currency:"inr",
//             product_data:{
//                  name:product.productTitle?.substr(0,30)+'....',
//                 //  images :[products.images]
//             },
//              unit_amount:product.price * 100 ,
//         },
//         quantity:product.quantity
//     }))

//     const customer = await stripe.customer.create({
//           metadata:{
//             userId:req.body.userId ,
//             cart:JSON.stringify(lineItems)
//           }
//     })

//     const session = await stripe.checkout.session.create({
//         payment_method_types: ["card"],
//         phone_number_collection:{
//             enabled:true 
//         },
//         customer:customer.id  , 
//         line_items:lineItems,
//         mode:"payment",
//         shipping_address_collection:{
//             allowed_countries:['US','IN']
//         },
//         success_url:`${process.env.CLIENT_BASE_URL/payment/complete/{CHECKOUT_SESSION_ID}}`,
//         cancel_url:"http://localhost:3006/cancel",
//     });
//     res.json({id : session.id})
// })

// //get all payment 
// router.get('/payment/complete',async (req , res )=>{
//     const result = Promise.all([
//         stripe.checkout.session.retrieve(req.query.session_id ,{expand:['payment_intent.payment_method']}),
//         stripe.checkout.sessions.lineItems(req.query.session_id)
//     ])
//     //console.log(JSON.stringify(await result))

//     res.status(200).send(JSON.stringify(await result))
// });

// //get cancel 
// router.get('/cancel',(req ,res )=>{
//     res.redirect('/')
// })

// module.exports = router;


// -------------------- Imports --------------------
const express = require("express");
const router = express.Router();
const { Orders } = require("../models/orders");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // ✅ اسم المتغير الصحيح

// -------------------- Create Checkout Session --------------------
router.post("/", async (req, res) => {
  try {
    const { products, country, userId } = req.body;

    // ✅ تحقق من أن البيانات موجودة
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products provided." });
    }

    // ✅ تجهيز قائمة الدول (إن وجدت)
    const countryList = Array.isArray(country)
      ? country.map((item) => item.country)
      : [];

    // ✅ تجهيز المنتجات
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: `${product.productTitle?.substr(0, 30)}...`,
          // images: [product.images] // يمكنك تفعيلها لاحقًا
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    // ✅ إنشاء عميل (Customer)
    const customer = await stripe.customers.create({
      metadata: {
        userId,
        cart: JSON.stringify(lineItems),
      },
    });

    // ✅ إنشاء جلسة دفع (Checkout Session)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      phone_number_collection: { enabled: true },
      customer: customer.id,
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: countryList.length ? countryList : ["US", "IN"],
      },
      success_url: `${process.env.CLIENT_BASE_URL}/payment/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_BASE_URL}/payment/cancel`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    res.status(500).json({ error: error.message });
  }
});

// -------------------- Payment Complete --------------------
router.get("/payment/complete", async (req, res) => {
  try {
    const sessionId = req.query.session_id;

    if (!sessionId) {
      return res.status(400).json({ error: "Missing session_id parameter." });
    }

    const result = await Promise.all([
      stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent.payment_method"],
      }),
      stripe.checkout.sessions.listLineItems(sessionId),
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Payment retrieval error:", error);
    res.status(500).json({ error: error.message });
  }
});

// -------------------- Cancel Payment --------------------
router.get("/cancel", (req, res) => {
  res.redirect("/");
});

// -------------------- Export Router --------------------
module.exports = router;
