// const mongoose = require("mongoose");

// const categorySchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   slug: {
//     type: String,
//     required: true,
//     unque: true,
//   },
//   images: [
//     {
//       type: String,
//       required: true,
//     },
//   ],
//   color: {
//     type: String,
//     required: true,
//   },
//   parentId: {
//     type: String,
//   },
// },{timestamps:true});

// // subCatSchema.virtual('id').get(function (){
// //   return this._id.toHexString();
// // });
// // subCatSchema.set('toJSON',{
// //   virtual:true,
// // })
// // exports.Category = mongoose.model('Category', categorySchema);

// const Category = mongoose.model("Category", categorySchema);

// module.exports = Category;

// //   images: {
// //   type: [String],
// //   required: true,
// //   validate: {
// //     validator: function (arr) {
// //       return arr.length > 0;
// //     },
// //     message: 'At least one image is required.'
// //   }
// // }










const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    images: [
      {
        type: String,
       
      },
    ],
    color: {
      type: String,
     
    },
    parentId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// ----------- إضافة id بدل _id ----------------
categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// تفعيل تحويل الفيرتشوال عند تحويل JSON
categorySchema.set("toJSON", {
  virtuals: true,
});
categorySchema.set("toObject", {
  virtuals: true,
});
// ------------------------------------------------

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
