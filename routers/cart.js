const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const mongoose = require("mongoose");

// 📦 Get all cart items
router.get("/", async (req, res) => {
  try {
    const cartList = await Cart.find(req.query);
    if (!cartList || cartList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No items found" });
    }
    return res.status(200).json(cartList);
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
      return res.status(400).json({ message: "Invalid cart ID" });
    }

    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json(cartItem);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", error: err.message });
  }
});

// 🗑️ Delete item from cart
router.delete("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Cart item not found", success: false });
    }

    await Cart.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Cart item deleted successfully" });
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
    const existingItem = await Cart.findOne({ productId, userId });
    if (existingItem) {
      return res.status(409).json({
        status: false,
        message: "Product already exists in the cart!",
      });
    }

    // إنشاء عنصر جديد
    const newCartItem = new Cart({
      productTitle: req.body.productTitle,
      images: req.body.images,
      rating: req.body.rating,
      price: req.body.price,
      quantity: req.body.quantity,
      subTotal: req.body.subTotal,
      productId,
      userId,
    });

    const savedCart = await newCartItem.save();

    res.status(201).json({
      success: true,
      message: "Cart item added successfully!",
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
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart ID",
      });
    }

    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // السيرفر يحسب الكمية
    const newQuantity = Number(req.body.quantity);

    if (isNaN(newQuantity) || newQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });
    }

    // حفظ القيم الصحيحة
    cartItem.quantity = newQuantity;
    cartItem.subTotal = Number(cartItem.price) * newQuantity;

    const saved = await cartItem.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: saved,
    });
  } catch (err) {
    console.error("Error in PUT /cart/:id", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});


// router.get("/count", async (req, res) => {
//   const cartItemsCount = await Cart.countDocuments();

//   if (!cartItemsCount) {
//     return res.status(500).json({ success: false });
//   }
//   return res.status(200).json(cartItemsCount);
// });


module.exports = router;
