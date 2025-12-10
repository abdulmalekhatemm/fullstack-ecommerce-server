const mongoose = require("mongoose");
const recentlyViewdSchema = mongoose.Schema({
  prodId : {
    type: String ,
    default: ''
  },
  name: {
    type: String,
    required: true,
  },
    customerId: {
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
  catName:{
    type: String ,
    default: '',
    trim: true
  },
    subCatId:{
    type: String ,
    default: '',
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  SubCat: {
   type: String ,
    default: '',
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
  productRam: [{
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "ProductRams",
    type:String ,
    required: true
  }],
  size: [{
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "ProductSize",
    type:String ,
    default: null
  }],
  productWeight:[ {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "ProductWeight",
    type:String ,
    default: null
  }],
  dataCreated: {
    type: Date,
    default: Date.now,
  },
});

recentlyViewdSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
recentlyViewdSchema.set("toJSON", {
  virtuals: true,
});


const RecentlyViewd = mongoose.model("RecentlyViewd", recentlyViewdSchema);
module.exports = RecentlyViewd;

//    numReviews: {
//         type: String,
//         default: false ,
//     },
