// const { populate } = require("dotenv");
// const Category = require("../models/category");
// const Product = require("../models/products");
// const RecentlyViewd = require("../models/RecentlyViewd");
// const ImageUpload = require("../models/imageUpload");
// const express = require("express");
// const { model } = require("mongoose");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const limit = require("p-limit");
// const mongoose = require("mongoose");
// var imageArr = [];
// var productEditId;
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "upload");
//   },
//   filename: function (req, file, cb) {
//     const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, unique + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage: storage });

// router.post(`/upload`, upload.array("images"), async (req, res) => {
//   imageArr = [];
//   const files = req.files;
//   for (let i = 0; i < files.length; i++) {
//     imageArr.push(files[i].filename);
//   }
//   console.log(imageArr);
//   res.json({ images: imageArr });
// });
// //================
// //==Create Product
// //================
// // This Code From My Sefl

// router.post("/upload", upload.array("images"), async (req, res) => {
//   let images = [];
//   if (productEditId !== undefined) {
//     const product = await Product.findById(productEditId);

//     if (product) {
//       images = product.images;
//       console.log(product);
//     }
//     if (images.length !== 0) {
//       for (image of images) {
//         fs.unlinkSync(`upload/${image}`);
//       }
//       productEditId = "";
//     }
//   }
//   imageArr = [];
//   const files = req.files;
//   for (let i = 0; i < files.length; i++) {
//     imageArr.push(files[i].filename);
//   }
//   res.send(imageArr);
// });

// router.get("/recentlyViewd", async (req, res) => {
//   try {
//     // التقاط معلومات الترقيم (Pagination)
//     const page = Math.max(1, parseInt(req.query.page) || 1);
//     const perPage = parseInt(req.query.perPage) || 12;

//     // بناء استعلام البحث (إن وجد)
//     const query = { ...req.query }; // يمكن تخصيصه أكثر لو تريد

//     // حساب إجمالي السجلات
//     const totalProducts = await RecentlyViewd.countDocuments(query);
//     const totalPages = Math.ceil(totalProducts / perPage);

//     // جلب البيانات مع التصفية والترقيم
//     const productList = await RecentlyViewd.find(query)
//       .populate("category")
//       .populate("SubCat")
//       .skip((page - 1) * perPage)
//       .limit(perPage);

//     // إرجاع النتيجة
//     return res.status(200).json({
//       success: true,
//       products: productList,
//       totalPages,
//       page,
//     });
//   } catch (err) {
//     console.error("❌ Server Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: err.message,
//     });
//   }
// });

// router.post("/recentlyViewd", async (req, res) => {
//   try {
//     const {
//       prodId, // 👈 أرسل هذا من الواجهة عند عرض المنتج
//       name,
//       images,
//       SubCat,
//       description,
//       brand,
//       price,
//       oldPrice,
//       category,
//       countInStock,
//       rating,
//       isFeatured,
//       discount,
//       productRam,
//       size,
//       productWeight,
//       catName,
//     } = req.body;

//     // ✅ تأكد من وجود الفئة
//     const validCategory = await Category.findById(category);
//     if (!validCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Invalid category ID",
//       });
//     }

//     // ✅ تحقق إن المنتج موجود مسبقًا في RecentlyViewd
//     const existing = await RecentlyViewd.findOne({ prodId });
//     if (existing) {
//       return res.status(200).json({
//         success: true,
//         message: "Product already exists in Recently Viewed",
//         product: existing,
//       });
//     }

//     // ✅ إنشاء سجل جديد
//     const recentlyViewdItem = new RecentlyViewd({
//       prodId,
//       name,
//       images:
//         req.body.images && req.body.images.length
//           ? req.body.images
//           : ["default-product.png"],
//       description,
//       brand,
//       price,
//       oldPrice,
//       catName,
//       SubCat,
//       category,
//       countInStock,
//       rating,
//       isFeatured,
//       discount,
//       productRam,
//       size,
//       productWeight,
//     });

//     const savedProduct = await recentlyViewdItem.save();

//     res.status(201).json({
//       success: true,
//       message: "Added to Recently Viewed",
//       product: savedProduct,
//     });
//   } catch (err) {
//     console.error("❌ Error in POST /recentlyViewd:", err.message);
//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// });

// router.post("/create", async (req, res) => {
//   try {
//     // const imgurl = [];
//     const {
//       name,
//       SubCat,
//       subCatId,
//       description,
//       brand,
//       price,
//       oldPrice,
//       category,
//       countInStock,
//       rating,
//       isFeatured,
//       discount,
//       productRam,
//       size,
//       productWeight,
//       location,
//     } = req.body;

//     const validCategory = await Category.findById(category);
//     if (!validCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Invalid category ID",
//       });
//     }
//     //imgurl
//     let product = new Product({
//       name: req.body.name,
//       description: req.body.description,
//       images: imageArr,
//       brand: req.body.brand,
//       price: req.body.price,
//       oldPrice: req.body.oldPrice,
//       catName: req.body.catName,
//       SubCat: req.body.SubCat,
//       category: req.body.category,
//       countInStock: req.body.countInStock,
//       rating: req.body.rating,
//       isFeatured: req.body.isFeatured,
//       discount: req.body.discount,
//       productRam: req.body.productRam,
//       size: req.body.size,
//       productWeight: req.body.productWeight,
//       location: req.body.location !== "" ? req.body.location : "All",
//     });

//     const savedProduct = await product.save();

//     res.status(201).json(savedProduct);
//   } catch (err) {
//     console.error("❌ Error in POST /products/create:", err.message);
//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const page = Math.max(1, parseInt(req.query.page) || 1);
//     const perPage = parseInt(req.query.perPage) || 30;
//     const catQuery = req.query.catName?.trim();
//     const subCatId = req.query.subCatId?.trim();
//     const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : null;
//     const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;
//     const rating = req.query.rating ? parseInt(req.query.rating) : null;

//     let productList;
//     let query = {};

//     // بناء الاستعلام بناءً على المعلمات المتاحة
//     if (catQuery) {
//       console.log("🟢 فلترة حسب التصنيف:", catQuery);
//       query.catName = { $regex: new RegExp(`^${catQuery}$`, "i") };
//     }

//     if (subCatId) {
//       console.log("🟢 فلترة حسب التصنيف الفرعي:", subCatId);
//       query.subCatId = subCatId;
//     }

//     // جلب ا لبيانات الأساسية
//     if (Object.keys(query).length > 0) {
//       if (
//         req.query.location !== undefined &&
//         req.query.location !== null &&
//         req.query.location !== "All"
//       ) {
//         productList = await Product.find({ location: req.query.location })
//           // .populate("category")
//           .populate("SubCat")
//           .skip((page - 1) * perPage)
//           .exec();
//       }
//     } else {
//         if (
//         req.query.location !== undefined &&
//         req.query.location !== null &&
//         req.query.location !== "All"
//       ) {
        
//          console.log("🟢 جميع المنتجات بدون فلترة");
//       productList = await Product.find({subCatId: req.query.subCatId })
//         .populate("category")
//         .populate("SubCat")
//         .skip((page - 1) * perPage)
//         .limit(perPage)
//         .exec();

//       }
//       else
//       {
//          console.log("🟢 جميع المنتجات بدون فلترة");
//       productList = await Product.find({catName:req.query.catName , location: req.query.location})
//         .populate("category")
//         .populate("SubCat")
//         .skip((page - 1) * perPage)
//         .limit(perPage)
//         .exec();
//       }
   
    
//     }

//     // تطبيق فلترة السعر إذا كانت موجودة
//     if (minPrice !== null || maxPrice !== null) {
//       productList = productList.filter((product) => {
//         if (minPrice !== null && product.price < minPrice) {
//           return false;
//         }
//         if (maxPrice !== null && product.price > maxPrice) {
//           return false;
//         }
//         return true;
//       });
//     }

//     // تطبيق فلترة السعر إذا كانت موجودة
//     if (rating !== null) {
//       productList = productList.filter((product) => {
//         if (rating !== null && product.price < rating) {
//           return false;
//         }
//         return true;
//       });
//     }

//     const totalPosts = await Product.countDocuments(query);
//     const totalPages = Math.ceil(totalPosts / perPage);

//     return res.status(200).json({
//       success: true,
//       products: productList,
//       totalPages,
//       page,
//     });
//   } catch (err) {
//     console.error("❌ Server Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: err.message,
//     });
//   }
// });


// router.get('/get/count', async (req, res) => {
//     const productCount = await Product.countDocuments();
//     if (!productCount) {
//         res.status(500).json({ success: false });
//     }
//     res.send({
//         productCount: productCount
//     });
// });

// // router.get('/subCat/get/count', async (req, res) => {
// //     const productCount = await Product.find();
// //     if (!productCount) {
// //         res.status(500).json({ success: false });
// //     }
// //     res.send({
// //         productCount: productCount
// //     });
// // });

// router.get("/featured", async (req, res) => {
//   let productList ="";
//   if (
//     req.query.location !== undefined &&
//     req.query.location !== null &&
//     req.query.location !== "All"
//   ) {
//      productList = await Product.find({
//       isFeatured: true,
//       location: req.query.location,
//     });
//   }
//   else
//   {
//       if (
//         req.query.location !== undefined &&
//         req.query.location !== null &&
//         req.query.location !== "All"
//       ) {
//       }
//      productList = await Product.find({ isFeatured: true });
//   }

//   if (!productList) {
//     return res.status(500).json({ success: false });
//   }
//   return res.status(200).json(productList);
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params; // ✅ استخراج id من params
//     productEditId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Product ID",
//       });
//     }

//     const product = await Product.findById(id);

//     if (!product) {
//       return res
//         .status(404)
//         .json({ message: "The product with the given ID was not found." });
//     }

//     return res.status(200).json(product);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// });

// // 🧹 دالة حذف الصورة

// router.post("/deleteImage", async (req, res) => {
//   try {
//     const { image } = req.body;

//     console.log("🧾 Received body:", req.body);
//     console.log("🧾 Received image name:", image);

//     if (!image || typeof image !== "string") {
//       console.log("⚠️ Missing or invalid image name!");
//       return res.status(400).json({ msg: "Invalid or missing image name" });
//     }

//     // استخرج فقط اسم الصورة (بدون المسار الكامل)
//     const imageName = path.basename(image);
//     const filePath = path.join(__dirname, "..", "upload", imageName);

//     console.log("📂 Full path to delete:", filePath);

//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//       console.log("🗑️ Deleted successfully:", imageName);
//       return res.status(200).json({ msg: "Image deleted successfully" });
//     } else {
//       console.log("⚠️ File not found:", filePath);
//       return res.status(404).json({ msg: "Image not found" });
//     }
//   } catch (error) {
//     console.error("❌ Error deleting image:", error.message);
//     console.error("🔍 Stack:", error.stack);
//     res.status(500).json({
//       msg: "Failed to delete image",
//       error: error.message,
//     });
//   }
// });

// //Router Detelted

// router.delete("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res
//         .status(404)
//         .json({ message: "Product not found", status: false });
//     }

//     // لو الصور مخزنة كمسارات محلية فقط
//     if (product.images && product.images.length > 0) {
//       for (const image of product.images) {
//         const filePath = path.join(__dirname, "..", "upload", image);

//         // تأكد أن الملف موجود قبل الحذف
//         if (fs.existsSync(filePath)) {
//           fs.unlinkSync(filePath);
//         }
//       }
//     }

//     const deleteProduct = await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "The Product Is Deleted!", status: true });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // router.get("/", async (req, res) => {
// //   try {
// //     const page = Math.max(1, parseInt(req.query.page) || 1);
// //     const perPage = parseInt(req.query.perPage) || 8;
// //     const catQuery = req.query.catName?.trim(); // إزالة المسافات الزائدة
// //     const subCatId = req.query.subCatId?.trim();
// //     let productList;

// //     if (catQuery) {
// //       console.log("🟢 فلترة حسب التصنيف:", catQuery);

// //       productList = await Product.find({
// //         catName: { $regex: new RegExp(`^${catQuery}$`, "i") }, // تجاهل حالة الأحرف
// //       })
// //         .populate("category")
// //         .populate("SubCat")
// //         .exec();
// //     } else {
// //       console.log("🟢 جميع المنتجات بدون فلترة");

// //       productList = await Product.find()
// //         .populate("category")
// //         .populate("SubCat")
// //         .skip((page - 1) * perPage)
// //         .limit(perPage)
// //         .exec();
// //     }
// //     if (subCatId) {
// //       console.log("🟢 فلترة حسب التصنيف:", subCatId);

// //       productList = await Product.find({
// //         subCatId: { $regex: new RegExp(`^${subCatId}$`, "i") }, // تجاهل حالة الأحرف
// //       })
// //         .populate("category")
// //         .populate("SubCat")
// //         .exec();
// //     } else {
// //       console.log("🟢 جميع المنتجات بدون فلترة");

// //       productList = await Product.find()
// //         .populate("category")
// //         .populate("SubCat")
// //         .skip((page - 1) * perPage)
// //         .limit(perPage)
// //         .exec();
// //     }

// //     const totalPosts = await Product.countDocuments();
// //     const totalPages = Math.ceil(totalPosts / perPage);

// //     return res.status(200).json({
// //       success: true,
// //       products: productList,
// //       totalPages,
// //       page,
// //     });
// //   } catch (err) {
// //     console.error("❌ Server Error:", err);
// //     res.status(500).json({ success: false, message: "Server Error", error: err.message });
// //   }
// // });

// // router.put("/:id", upload.array("images", 5), async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     if (!mongoose.Types.ObjectId.isValid(id)) {
// //       return res
// //         .status(400)
// //         .json({ success: false, message: "Invalid Product ID" });
// //     }

// //     const product = await Product.findById(id);
// //     if (!product)
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Product not found" });

// //     // حقول نصية
// //     const {
// //       name,
// //       SubCat,
// //       subCatId,
// //       description,
// //       brand,
// //       price,
// //       oldPrice,
// //       category,
// //       catName,
// //       countInStock,
// //       rating,
// //       numReviews,
// //       isFeatured,
// //       dataCreated,
// //       discount,
// //       productRam,
// //       size,
// //       productWeight,
// //     } = req.body;

// //     // صور جديدة تم رفعها عبر multer (أسماء الملفات)
// //     const newImages =
// //       req.files && req.files.length ? req.files.map((f) => f.filename) : [];

// //     // سلوك الصنف: لو فيه newImages -> استبدل الصور القديمة بالجديدة (و احذف ملفات القديمة)
// //     if (newImages.length > 0) {
// //       // احفظ قائمة الصور القديمة للحذف
// //       const oldImages =
// //         product.images && product.images.length ? [...product.images] : [];

// //       // استبدال
// //       product.images = newImages;

// //       // حذف الملفات الفعلية القديمة من المجلد upload
// //       for (const img of oldImages) {
// //         try {
// //           const filePath = path.join(__dirname, "..", "upload", img);
// //           if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
// //         } catch (err) {
// //           console.warn("Failed to delete old image", img, err.message);
// //         }
// //       }
// //     }
// //     // لو لم تُرسل صور جديدة => لا نغير product.images (نحتفظ بالقديمة)

// //     // تحديث الحقول النصية فقط إذا تم إرسالها (كما تريد)
// //     if (name !== undefined) product.name = name;
// //     if (SubCat !== undefined) product.SubCat = SubCat;
// //     if (catName !== undefined) product.catName = catName;
// //     if (subCatId !== undefined) product.subCatId = subCatId;
// //     if (description !== undefined) product.description = description;
// //     if (brand !== undefined) product.brand = brand;
// //     if (price !== undefined) product.price = Number(price);
// //     if (oldPrice !== undefined) product.oldPrice = Number(oldPrice);
// //     if (countInStock !== undefined) product.countInStock = Number(countInStock);
// //     if (rating !== undefined) product.rating = Number(rating);
// //     if (discount !== undefined) product.discount = Number(discount);
// //     if (productRam !== undefined) product.productRam = productRam;
// //     if (size !== undefined) product.size = size;
// //     if (productWeight !== undefined) product.productWeight = productWeight;
// //     if (numReviews !== undefined) product.numReviews = Number(numReviews);
// //     if (isFeatured !== undefined)
// //       product.isFeatured = isFeatured === "true" || isFeatured === true;
// //     if (dataCreated) product.dataCreated = new Date(dataCreated);

// //     // تحقق من الفئة إذا أرسلتها
// //     if (category) {
// //       if (!mongoose.Types.ObjectId.isValid(category)) {
// //         return res
// //           .status(400)
// //           .json({ success: false, message: "Invalid category ID" });
// //       }
// //       const validCat = await Category.findById(category);
// //       if (!validCat)
// //         return res
// //           .status(404)
// //           .json({ success: false, message: "Category not found" });
// //       product.category = category;
// //     }

// //     const saved = await product.save();
// //     return res
// //       .status(200)
// //       .json({ success: true, message: "Product updated", data: saved });
// //   } catch (err) {
// //     console.error("PUT /products/:id error:", err);
// //     return res
// //       .status(500)
// //       .json({ success: false, message: "Server error", error: err.message });
// //   }
// // });

// router.put("/:id", upload.array("images", 5), async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Product ID" });
//     }

//     const product = await Product.findById(id);
//     if (!product)
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });

//     // الحقول النصية من body
//     const {
//       name,
//       SubCat,
//       subCatId,
//       description,
//       brand,
//       price,
//       oldPrice,
//       category,
//       catName,
//       countInStock,
//       rating,
//       numReviews,
//       isFeatured,
//       dataCreated,
//       discount,
//       productRam,
//       size,
//       productWeight,
//       location,
//     } = req.body;

//     // ✅ تحميل الصور الجديدة
//     const newImages =
//       req.files && req.files.length ? req.files.map((f) => f.filename) : [];

//     if (newImages.length > 0) {
//       const oldImages =
//         product.images && product.images.length ? [...product.images] : [];
//       product.images = newImages;
//       for (const img of oldImages) {
//         try {
//           const filePath = path.join(__dirname, "..", "upload", img);
//           if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//         } catch (err) {
//           console.warn("Failed to delete old image", img, err.message);
//         }
//       }
//     }

//     // ✅ تحديث الحقول النصية فقط إذا أُرسلت
//     if (name !== undefined) product.name = name;
//     if (SubCat !== undefined) product.SubCat = SubCat;
//     if (catName !== undefined) product.catName = catName;
//     if (subCatId !== undefined) product.subCatId = subCatId;
//     if (description !== undefined) product.description = description;
//     if (location !== undefined) product.location = location;
//     if (brand !== undefined) product.brand = brand;
//     if (price !== undefined) product.price = Number(price);
//     if (oldPrice !== undefined) product.oldPrice = Number(oldPrice);
//     if (countInStock !== undefined) product.countInStock = Number(countInStock);
//     if (rating !== undefined) product.rating = Number(rating);
//     if (discount !== undefined) product.discount = Number(discount);
//     if (numReviews !== undefined) product.numReviews = Number(numReviews);
//     if (isFeatured !== undefined)
//       product.isFeatured = isFeatured === "true" || isFeatured === true;
//     if (dataCreated) product.dataCreated = new Date(dataCreated);

//     // ✅ تحديث أو تفريغ الحقول المصفوفية (RAM / SIZE / WEIGHT)
//     const updateArrayField = (field, value) => {
//       if (value === undefined) return; // لم يرسل → لا نغيره
//       if (Array.isArray(value)) {
//         // مصفوفة مرسلة من الـ frontend
//         product[field] = value.filter((v) => v && v.trim() !== "");
//       } else if (typeof value === "string") {
//         // قيمة مفردة
//         product[field] = value.trim() ? [value.trim()] : [];
//       } else {
//         // لو شيء آخر → نحذف القيم
//         product[field] = [];
//       }
//     };

//     updateArrayField("productRam", productRam);
//     updateArrayField("size", size);
//     updateArrayField("productWeight", productWeight);

//     // ✅ تحقق من الفئة إذا أرسلت
//     if (category) {
//       if (!mongoose.Types.ObjectId.isValid(category)) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Invalid category ID" });
//       }
//       const validCat = await Category.findById(category);
//       if (!validCat)
//         return res
//           .status(404)
//           .json({ success: false, message: "Category not found" });
//       product.category = category;
//     }

//     const saved = await product.save();
//     return res
//       .status(200)
//       .json({ success: true, message: "Product updated", data: saved });
//   } catch (err) {
//     console.error("PUT /products/:id error:", err);
//     return res
//       .status(500)
//       .json({ success: false, message: "Server error", error: err.message });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const Category = require("../models/category");
const Product = require("../models/products");
const RecentlyViewd = require("../models/RecentlyViewd");

var imageArr = [];
var productEditId;

// إعداد التخزين للصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "upload"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ====== رفع الصور ======
router.post("/upload", upload.array("images"), async (req, res) => {
  imageArr = req.files.map((f) => f.filename);
  res.json({ images: imageArr });
});

// ====== إنشاء منتج ======
router.post("/create", async (req, res) => {
  try {
    const {
  name,
  SubCat,
  catId,
  subCatId,  // ✔ أضف هذا
  description,
  brand,
  price,
  oldPrice,
  category,
  countInStock,
  rating,
  isFeatured,
  discount,
  productRam,
  size,
  productWeight,
  location,
  catName,
} = req.body;


    const validCategory = await Category.findById(category);
    if (!validCategory)
      return res.status(404).json({ success: false, message: "Invalid category ID" });

  const product = new Product({
  name,
  SubCat,
  catId,
  subCatId,  // ✔ تخزين ID هنا
  description,
  brand,
  price,
  oldPrice,
  category,
  catName,
  images: imageArr,
  countInStock,
  rating,
  isFeatured,
  discount,
  productRam,
  size,
  productWeight,
  location: location || "All",
});


    const savedProduct = await product.save();
    imageArr = []; // مسح الصور بعد الحفظ
    res.status(201).json({ success: true, product: savedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ====== جلب المنتجات مع فلترة وPagination ======
router.get("/", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const perPage = parseInt(req.query.perPage) || 30;

    let query = {};
    if (req.query.catName) query.catName = req.query.catName;
    if (req.query.subCatId) query.subCatId = req.query.subCatId;
    if (req.query.location && req.query.location !== "All") query.location = req.query.location;
    if (req.query.minPrice || req.query.maxPrice)
      query.price = {
        ...(req.query.minPrice ? { $gte: parseFloat(req.query.minPrice) } : {}),
        ...(req.query.maxPrice ? { $lte: parseFloat(req.query.maxPrice) } : {}),
      };
    if (req.query.rating) query.rating = { $gte: parseInt(req.query.rating) };

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / perPage) || 1;

    const products = await Product.find(query)
      .populate("category")
      .populate("SubCat")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

   return  res.status(200).json({ success: true, products, totalPages, page });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// ====== عدد المنتجات ======
router.get("/get/count", async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.status(200).json({ productCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// ====== المنتجات المميزة ======
router.get("/featured", async (req, res) => {
  try {
    let query = { isFeatured: true };
    if (req.query.location && req.query.location !== "All") query.location = req.query.location;

    const products = await Product.find(query);
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ====== عرض منتج حسب ID ======
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    productEditId = id;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid Product ID" });

    const product = await Product.findById(id).populate("category").populate("SubCat");
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

   return res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ====== حذف صورة ======
router.post("/deleteImage", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ msg: "Image name is required" });

    const filePath = path.join(__dirname, "..", "upload", path.basename(image));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({ msg: "Image deleted successfully" });
    } else {
      res.status(404).json({ msg: "Image not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete image", error: err.message });
  }
});

// ====== حذف منتج ======
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // حذف الصور المحلية
    if (product.images && product.images.length) {
      for (const img of product.images) {
        const filePath = path.join(__dirname, "..", "upload", img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ====== تعديل المنتج ======
router.put("/:id", upload.array("images", 5), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid Product ID" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // الحقول النصية
    const fields = [
      "name", "SubCat", "subCatId", "description", "brand", "price", "oldPrice",
      "category", "catName", "countInStock", "rating", "numReviews", "isFeatured",
      "discount", "productRam", "size", "productWeight", "location",
    ];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) product[f] = req.body[f];
    });

    // الصور الجديدة
    if (req.files && req.files.length) {
      const oldImages = [...product.images];
      product.images = req.files.map((f) => f.filename);
      for (const img of oldImages) {
        const filePath = path.join(__dirname, "..", "upload", img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }

    const saved = await product.save();
    res.status(200).json({ success: true, message: "Product updated", product: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

































































































// router.get('/', async (req, res) => {
//   try {

//     const page = Math.max(1, parseInt(req.query.page) || 1);
//     const perPage = parseInt(req.query.perPage);
//     const totalPosts = await Product.countDocuments();
//     const totalPages = Math.max(0, Math.ceil(totalPosts / perPage));

//     // لا نُعيد 404 إذا totalPages === 0، نرجع صفحة فارغة
//     if (totalPages > 0 && page > totalPages) {
//       return res.status(404).json({ message: 'Page Not Found' });
//     }

//       // SubCat
//     const productList =[] ;
//     if (req.query.catName !== undefined ){
//       const productList = await Product.find({catName: req.query.catName}).populate('category').populate("SubCat")
//     }
//     else
//       {
//         const productList = await Product.find()
//       .populate('category').populate("SubCat").populate("name")
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .exec();
//     }
//      if(!productList)
//       {
//   return res.status(200).json({ products: productList, totalPages, page });
//       }

//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: err.message });
//   }
// });

// ✅ جلب المنتجات مع دعم الفلترة والتقسيم (pagination)

// router.get('/', async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const perPage = 5;
//         const totalPosts = await Product.countDocuments();
//         const totalPages = Math.ceil(totalPosts / perPage);
//         if(page > totalPages){
//             return res.status(404).json({message:"Page Not Found "});
//         }
//         const productList = await Product.find().populate("category")
//         .skip((page - 1) * perPage)
//         .limit(perPage)
//         .exec();
//         if (!productList) {
//             return res.status(500).json({ success: false });
//         }
//           return res.status(200).json({
//             "products":productList,
//             "totalPages":totalPages,
//             "page":page
//         });

//     } catch (error) {
//         console.error('❌ Error fetching products:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// });

//Get Produt from Id

// router.get('/:id', async (req, res) => {
//   try {
//     productEditId = req.params.id ;
//       if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid Product ID"
//     });
//   }
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "The product with the given ID was not found." });
//     }

//     return res.status(200).json(product);

//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = 5;
//     const totalPosts = await Product.countDocuments();
//     const totalPages = Math.ceil(totalPosts / perPage);
//     if (page > totalPages && totalPages !== 0) {
//       return res.status(404).json({ message: "Page Not Found" });
//     }

//     const productList = await Product.find()
//       .populate("category")
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .exec();

//     // بناء روابط كاملة للصور (اختياري لكن يسهل على الـ frontend)
//     const base = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
//     const mapped = productList.map(p => {
//       const obj = p.toObject ? p.toObject() : p;
//       obj.images = (obj.images || []).map(img => `${base}/upload/${img}`);
//       return obj;
//     });

//     return res.status(200).json({
//       products: mapped,
//       totalPages,
//       page
//     });
//   } catch (error) {
//     console.error('❌ Error fetching products:', error.message);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// });

// افترض base URL
// const base = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = 5;
//     const totalPosts = await Product.countDocuments();
//     const totalPages = Math.ceil(totalPosts / perPage);

//     if (page > totalPages && totalPages !== 0) {
//       return res.status(404).json({ message: "Page Not Found" });
//     }

//     const productList = await Product.find()
//       .populate("category")
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .exec();

//     // تحويل الصور إلى روابط كاملة بغض النظر عن شكل ما في DB
//     const mapped = productList.map(p => {
//       const obj = p.toObject ? p.toObject() : p;
//       obj.images = (obj.images || []).map(img => {
//         if (!img) return null;
//         // إذا كانت قيمة حالية رابط كامل، استخدمها كما هي
//         if (typeof img === 'string' && (img.startsWith('http') || img.startsWith('https') || img.startsWith('blob:'))) {
//           return img;
//         }
//         // خلاف ذلك غالباً اسم ملف، ابنه إلى رابط كامل
//         return `${base.replace(/\/$/, '')}/upload/${img}`;
//       }).filter(Boolean);
//       return obj;
//     });

//     return res.status(200).json({ products: mapped, totalPages, page });
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const { name, description, images, brand, price, category,
//             countInStock, rating, numReviews, isFeatured, dataCreated } = req.body;

//     // تحقق من الصور
//     if (!Array.isArray(images) || images.length === 0) {
//       return res.status(400).json({ success: false, message: 'Images array is required.' });
//     }

//     // تحقق من الفئة
//     const validCategory = await Category.findById(category);
//     if (!validCategory) {
//       return res.status(404).json({ success: false, message: 'Invalid category ID.' });
//     }

//     // تحديث المنتج
//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         name, description, images, brand, price, category,
//         countInStock, rating, numReviews, isFeatured,
//         dataCreated: new Date(dataCreated)
//       },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ success: false, message: 'Product not found.' });
//     }

//     return res.status(200).json({ success: true, message: 'Product updated.', data: updated });

//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Server error', error: error.message });
//   }
//  });

// router.put('/:id', upload.array('images', 5), async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: 'Invalid Product ID' });
//     }

//     // text fields (may come from JSON body or FormData)
//     const {
//       name,
//       description,
//       brand,
//       price,
//       oldPrice,
//       category,
//       countInStock,
//       rating,
//       numReviews,
//       isFeatured,
//       dataCreated
//     } = req.body;

//     // determine images: prefer uploaded files (multer), else accept req.body.images (JSON string or array)
//     let newImages = [];
//     if (req.files && req.files.length > 0) {
//       newImages = req.files.map(f => f.filename);
//     } else if (req.body.images) {
//       try {
//         newImages = typeof req.body.images === 'string' ? JSON.parse(req.body.images) : req.body.images;
//         if (!Array.isArray(newImages)) newImages = [newImages];
//       } catch (e) {
//         newImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
//       }
//     }

//     // fetch current product
//     const product = await Product.findById(id);
//     if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

//     // حذف الصور القديمة إذا تم رفع صور جديدة
//     if (newImages.length > 0 && product.images && product.images.length > 0) {
//       for (const image of product.images) {
//         const filePath = path.join(__dirname, '..', 'upload', image);
//         if (fs.existsSync(filePath)) {
//           fs.unlinkSync(filePath);
//         }
//       }
//       product.images = newImages; // استبدال الصور القديمة بالجديدة
//     } else if (newImages.length === 0) {
//       // إذا لم يتم إرسال صور جديدة، احتفظ بالصور القديمة
//       newImages = product.images || [];
//     }

//     // optional category validation
//     if (category && !mongoose.Types.ObjectId.isValid(category)) {
//       return res.status(400).json({ success: false, message: 'Invalid category ID' });
//     }
//     if (category) {
//       const validCategory = await Category.findById(category);
//       if (!validCategory) return res.status(404).json({ success: false, message: 'Category not found.' });
//     }

//     // تحديث بيانات المنتج
//     product.name = name;
//     product.description = description;
//     product.brand = brand;
//     product.price = price;
//     product.oldPrice = oldPrice;
//     product.category = category;
//     product.countInStock = countInStock;
//     product.rating = rating;
//     product.numReviews = numReviews;
//     product.isFeatured = isFeatured;
//     if (dataCreated) product.dataCreated = new Date(dataCreated);

//     await product.save();
//     return res.status(200).json({ success: true, message: 'Product updated', data: product });

//   } catch (err) {
//     console.error('PUT /products/:id error:', err);
//     return res.status(500).json({ success: false, message: 'Server error', error: err.message });
//   }
// });

// router.put('/:id', upload.array('images', 5), async (req, res) => { ... })
// ====== PUT /api/products/:id  (مُعزَّز للتشخيص والتحكم) ======

// middleware multer يجب أن يكون معرف أصلاً: upload
// PUT /api/products/:id
// PUT /api/products/:id

// This Code From ChatGPT

// router.post(`/upload`, upload.array("images"), async (req, res) => {
//   const productEditId = req.body.id; // أرسل id من frontend
//   let imageArr = [];

//   if (productEditId) {
//     const category = await Category.findById(productEditId);
//     if (category && category.images.length) {
//       for (const image of category.images) {
//         const filePath = `upload/${image}`;
//         if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//       }
//       productEditId = "";
//     }
//   }

//   const files = req.files;
//   for (let i = 0; i < files.length; i++) {
//     imageArr.push(files[i].filename);
//   }

//   res.json({ images: imageArr });
// });
