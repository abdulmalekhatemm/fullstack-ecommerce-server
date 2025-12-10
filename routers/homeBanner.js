const express = require('express');
const router = express.Router();
const ImageUpload = require('../models/imageUpload'); 
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const pLimit = require('p-limit');
const { error } = require('console');
// const cloudinary = require('cloudinary');
const HomeBanner = require('../models/homeBanner');
const mongoose = require('mongoose');
var imageArr = [];
var categoryEditId ;
// cloudinary.config({
//   cloud_name : process.env.cloudinary_Config_Cloud_Nmae ,
//   api_key: process.env.cloudinary_Config_api_key ,
//   api_secret:process.env.cloudinary_Config_api_key,
// secure:true 
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload');
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({storage : storage });



router.post(`/upload`, upload.array("images"), async (req, res) => {
  const categoryEditId = req.body.categoryId; // أرسل id من frontend
  let imageArr = [];

  if (categoryEditId) {
    const homeBanner = await HomeBanner.findById(categoryEditId);
    if (homeBanner && homeBanner.images.length) {
      for (const image of category.images) {
        const filePath = `upload/${image}`;
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }
  }

  const files = req.files;
  for (let i = 0; i < files.length; i++) {
    imageArr.push(files[i].filename);
  }

  res.json({ images: imageArr });
});


router.get('/', async (req, res) => {
    try {

        const bannerImagesList = await HomeBanner.find();
     

         if (!bannerImagesList) {
            return res.status(500).json({ success: false });
        }
          return res.status(200).json({bannerImagesList});

    } catch (err) {
        console.error('🔥 Error while fetching categories:', err); // ✅ يظهر الخطأ الحقيقي
        res.status(500).json({ success: false, error: err.message });
        // console.log(category) // ✅ عرض الرسالة فقط
    }
});



// ❌ حذف صورة واحدة
router.delete("/deleteImage", async (req, res) => {
  const { image } = req.body;
  console.log("🧾 Received image name:", image);

  try {
    if (!image) {
      return res.status(400).json({ error: "Image name is required" });
    }

    const imageName = image.split("/").pop();
    const filePath = path.join(__dirname, "..", "upload", imageName);
    console.log("📂 Full path to delete:", filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("✅ Deleted:", filePath);
      return res.status(200).json({ msg: "Image deleted successfully" });
    } else {
      console.log("⚠️ File not found:", filePath);
      return res.status(404).json({ msg: "Image not found" });
    }
  } catch (error) {
    console.error("❌ Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image!" });
  }
});



router.get('/:id', async (req, res) => {
  homeBannerEditId = req.params.id ;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Category ID" });
  }

  try {
    const slide = await HomeBanner.findById(id);
    if (!slide) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(slide);
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.delete("/deleteImage", async (req, res) => {
  const image = req.query.img; // ← ← ← هذا الصحيح

  console.log("🧾 Received image name:", image);

  try {
    if (!image) {
      return res.status(400).json({ error: "Image name is required" });
    }

    const imageName = image.split("/").pop();
    const filePath = path.join(__dirname, "..", "upload", imageName);
    console.log("📂 Full path to delete:", filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("✅ Deleted:", filePath);
      return res.status(200).json({ msg: "Image deleted successfully" });
    } else {
      console.log("⚠️ File not found:", filePath);
      return res.status(404).json({ msg: "Image not found" });
    }
  } catch (error) {
    console.error("❌ Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image!" });
  }
});




router.post("/create", upload.array("images", 5), async (req, res) => {
  console.log("Body:", req.body);
  console.log("Files:", req.files);
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const imageArr = req.files.map(file => file.filename);

    const newEnter = new HomeBanner({
      images: imageArr,
    
    });

    const savenewEnter = await newEnter.save();
    res.status(201).json(savenewEnter);
  } catch (err) {
    console.error("❌ Error in /create:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// ===================
// تعديل كاتيجوري
// ===================
router.put('/:id', upload.array('images', 5), async (req, res) => {
  
  const newImages = req.files?.map(file => file.filename) || [];

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const slideItem = await HomeBanner.findById(req.params.id);
    if (!slideItem) {
      return res.status(404).json({ success: false, message: "Slide not found" });
    }

    // حذف الصور القديمة إذا تم رفع صور جديدة
    if (newImages.length > 0 && slideItem.images?.length > 0) {
      for (const image of slideItem.images) {
        const filePath = path.join(__dirname, "..", "upload", image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      // استبدال الصور القديمة بالجديدة
      slideItem.images = newImages;
    }

    await slideItem.save();
    res.status(200).json({ success: true, slideItem });

  } catch (error) {
    console.error("❌ Error in PUT /:id =>", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});


module.exports = router;




