const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const HomeBanner = require("../models/homeBanner");
const ImageUpload = require('../models/imageUpload');
const router = express.Router();

// مجلد الرفع
const UPLOAD_FOLDER = "upload";

// إنشاء مجلد الرفع لو غير موجود
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

// إعداد تخزين الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ============================
   GET ALL BANNERS
============================= */
router.get("/", async (req, res) => {
  try {
    const banners = await HomeBanner.find();
    res.json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ============================
   CREATE BANNER
============================= */
router.post("/create", upload.array("images", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No images uploaded",
      });
    }

    const images = req.files.map((file) => file.filename);

    const newBanner = new HomeBanner({
      images: images,
    });

    await newBanner.save();

    res.json({ success: true, message: "Banner created", data: newBanner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ============================
   DELETE BANNER + IMAGES
============================= */
router.delete("/:id", async (req, res) => {
  try {
    const banner = await HomeBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ success: false, error: "Banner not found" });
    }

    // حذف جميع الصور التابعة للبانر
    banner.images.forEach((img) => {
      const filePath = path.join(UPLOAD_FOLDER, img);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await HomeBanner.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ============================
   UPDATE BANNER (REPLACE ALL IMAGES)
============================= */
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const banner = await HomeBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ success: false, error: "Banner not found" });
    }

    // لو فيه صور جديدة → احذف القديمة
    if (req.files && req.files.length > 0) {
      banner.images.forEach((img) => {
        const filePath = path.join(UPLOAD_FOLDER, img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });

      banner.images = req.files.map((file) => file.filename);
    }

    await banner.save();

    res.json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
