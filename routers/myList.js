const express = require("express");
const router = express.Router();
const MyList = require("../models/myList");
const mongoose = require("mongoose");

// 📦 Get all cart items
router.get("/", async (req, res) => {
  try {
    const myList = await MyList.find(req.query);
    if (!myList || myList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No items found" });
    }
    return res.status(200).json(myList);
  } catch (err) {
    console.error("🔥 Error while fetching cart:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    // تنظيف البيانات الواردة قبل تنفيذ الاستعلام
    const filter = {};
         console.log("QUERY RECEIVED:", req.query);

    Object.keys(req.query).forEach((key) => {
      if (
        req.query[key] !== undefined &&
        req.query[key] !== "undefined" &&
        req.query[key] !== "" &&
        req.query[key] !== null
      ) {
        filter[key] = req.query[key];
      }
    });

    // لا تستعمل find() إذا كان الفلتر فارغ لأنك ستحصل نتائج كثيرة
    if (Object.keys(filter).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid filter provided",
      });
    }

    const myList = await MyList.find(filter);

    if (!myList || myList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No items found" });
    }

    return res.status(200).json(myList);

  } catch (err) {
    console.error("🔥 Error while fetching cart:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 📦 Get single cart item
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid myList ID" });
    }

    const myList = await MyList.findById(id);
    if (!myList) {
      return res.status(404).json({ message: "myList item not found" });
    }

    return res.status(200).json(myList);

  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", error: err.message });
  }
});

// 🗑️ Delete item from cart
router.delete("/:id", async (req, res) => {
  try {
    const myList = await MyList.findById(req.params.id);
    if (!myList) {
      return res
        .status(404)
        .json({ message: "myList item not found", success: false });
    }

    await MyList.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "myList item deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

// ➕ Add item to cart
router.post("/add", async (req, res) => {
    // const cartItem = await Cart.find({productId: req.body.productId});
    // console.log(cartItem);
  try {
    console.log("📦 Received body Now :", req.body);

    const { productId, userId } = req.body;

    // تحقق من القيم المطلوبة
    if (!productId || !userId) {
      return res.status(400).json({
        status: false,
        message: "productId and userId are required!",
      });
    }

    // تحقق إذا المنتج مضاف مسبقًا
    const existingItem = await MyList.findOne({ productId, userId });
    if (existingItem) {
      return res.status(409).json({
        status: false,
        message: "Product already exists in the myList!",
      });
    }

    // إنشاء عنصر جديد
    const Item = new MyList({
      productTitle: req.body.productTitle,
      images: req.body.images,
      rating: req.body.rating,
      price: req.body.price,
      productId,
      userId,
    });

    const savedCart = await Item.save();

    res.status(201).json({
      success: true,
      message: "Cart item added successfully to in myList!",
      data: savedCart,
    });
  } catch (err) {
    console.error("❌ Error in /cart/add:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});



// ✏️ Update cart item
router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await MyList.findByIdAndUpdate(
      req.params.id,
      {
        productTitle: req.body.productTitle,
        images: req.body.images,
        rating: req.body.rating,
        price: req.body.price,
        productId: req.body.productId,
        userId: req.body.userId,
      },
      { new: true }
    );

    if (!updatedCart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json(updatedCart);
  } catch (err) {
    console.error("❌ Error in PUT /cart/:id:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});




module.exports = router;



// router.get("/count", async (req, res) => {
//   const cartItemsCount = await Cart.countDocuments();

//   if (!cartItemsCount) {
//     return res.status(500).json({ success: false });
//   }
//   return res.status(200).json(cartItemsCount);
// });