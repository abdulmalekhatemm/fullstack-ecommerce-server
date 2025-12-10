const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  oldPrice: {
    type: Number,
    default: 0,
  },
  catName: {
    type: String,
    default: "",
    trim: true,
  },
  catId: {
    type: String,
    default: "",
  },
  subCatId: {
    type: String,
    default: "",
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  SubCat: {
    type: String,
    default: "", // ✅ يجب أن يطابق اسم الموديل في subCatSchema
  },
  countInStock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    required: true,
  },
  productRam: [
    {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "ProductRams",
      type: String,
      default: null,
    },
  ],
  size: [
    {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "ProductSize",
      type: String,
      default: null,
    },
  ],
  productWeight: [
    {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "ProductWeight",
      type: String,
      default: null,
    },
  ],
  location: {
    type: String,
    default: "All",
  },
  dataCreated: {
    type: Date,
    default: Date.now,
  },
});

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
productSchema.set("toJSON", {
  virtuals: true,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

//    numReviews: {
//         type: String,
//         default: false ,
//     },
