const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const authJwt = require("./helper/jwt.js");
app.use(cors());
// app.options('*',cors());

// middleware

app.use(express.json());
// app.use(authJwt());
app.use(express.urlencoded({ extended: true }));

// السماح بالوصول للصور
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// ✅ إضافة هذا السطر ضروري جداً
app.use("/upload", express.static(path.join(__dirname, "upload")));

// routes

const categoryRoutes = require("./routers/categories");
const subCatRoutes = require("./routers/subCat");
const ProductList = require("./routers/products");
const imageUpload = require("./routers/imageUpload");
const productWeightRoutes = require("./routers/productWeight");
const productRAMSRoutes = require("./routers/productRAMS");
const productSIZERoutes = require("./routers/productSize");
const userRouters = require("./routers/user.js");
const cartRouters = require("./routers/cart.js");
const productReviewsRouters = require("./routers/productReviews.js");
const myListRouters = require("./routers/myList.js");
const ordersRouters = require("./routers/orders.js");
const checkoutRouters = require("./routers/checkout.js");
const homeBanner = require("./routers/homeBanner.js");
const search = require("./routers/search.js");
const bodyParser = require("body-parser");

app.use("/upload", express.static("upload"));
app.use("/api/category", categoryRoutes);
app.use("/api/subCat", subCatRoutes);
app.use("/api/products", ProductList);
app.use("/api/productWeight", productWeightRoutes);
app.use("/api/productRAMS", productRAMSRoutes);
app.use("/api/productSize", productSIZERoutes);
app.use("/api/user", userRouters);
app.use("/api/cart", cartRouters);
app.use("/api/productReviews", productReviewsRouters);
app.use("/api/myList", myListRouters);
app.use("/api/orders", ordersRouters);
app.use("/api/checkout", checkoutRouters);
app.use("/api/homeBanner", homeBanner);
app.use("/api/imageUpload", imageUpload);
app.use("/api/search", search);
// اتصال بقاعدة البيانات
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });

// ✅ تشغيل السيرفر
app.listen(5000, () => {
  console.log("🚀 Server is running on http://localhost:5000");
});

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv/config');
// const multer = require('multer');
// // const pLimit = require('p-limit');

// // إعداد مكان الحفظ واسم الملف
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // مجلد الحفظ
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// // لجعل الصور قابلة للعرض في المتصفح
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(cors());
// app.options('*',cors());

// //middlewar
// app.use(bodyParser.json());

// //Routers
// const categoryRoutes = require('./routers/categories');

// app.use(`/api/category`,categoryRoutes);
// Database
// mongoose.connect(process.env.DB_CONNECTION)
//   .then(() => {
//     console.log('✅ Connected to MongoDB alerdy');
//     app.listen(process.env.PORT ,()=>{
//     console.log(`server is running http://localhost:${process.env.PORT}`)
// })

//   })
//   .catch((err) => {
//     console.error('❌ Failed to connect:', err);
//   });

// // mongoose.connect(process.env.CONNECTION_STRING, {
// //     useNewUrlParser:true ,
// //     useUnifiedTopology:true ,

// // })
// // .then(()=>{
// //    console.log('DataBase Conntected Is aleard ');
// //    //sever
// // app.listen(process.env.PORT ,()=>{
// //     console.log(`server is running http://localhost:${process.env.PORT}`)
// // })

// // }).catch((err)=>{
// //      console.log(err);
// // })
