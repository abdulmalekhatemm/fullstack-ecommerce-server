const mongoose = require("mongoose");

const subCatSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  SubCat: {
    type: String,
    required: true,
  },
parentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null
}
});

exports.subCatSchema = subCatSchema;
subCatSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
subCatSchema.set("toJSON", {
  virtual: true,
});

const SubCategory = mongoose.model("SubCategory", subCatSchema);
module.exports = SubCategory;
