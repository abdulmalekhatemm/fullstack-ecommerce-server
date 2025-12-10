const mongoose = require("mongoose");
const productReviewsSchema = mongoose.Schema({
  productId : {
    type: String ,
    required:true 
  },
  customerName: {
    type: String,
    required: true,
  },
    customerId: {
    type: String,
    required: true,
  },
  review:{
    type:String ,
    required:true ,
    default:""
  },
  customerRating:{
    type:Number ,
    required:true ,
    default:""
  },
    dataCreated: {
    type: Date,
    default: Date.now,
  },

});

productReviewsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
productReviewsSchema.set("toJSON", {
  virtuals: true,
});


const ProductReviews = mongoose.model("ProductReviews", productReviewsSchema);
module.exports = ProductReviews;

//    numReviews: {
//         type: String,
//         default: false ,
//     },
