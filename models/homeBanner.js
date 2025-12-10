const mongoose = require("mongoose");

const homeBannerSchema = mongoose.Schema({
  images: [{
    type: String,
    required: true,
  }]
});

homeBannerSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

homeBannerSchema.set("toJSON", {
  virtuals: true, // ✅ لاحظ هنا virtuals وليس virtual
});

// ✅ إنشاء الموديل
const homeBanner = mongoose.model("HomeBanner", homeBannerSchema);

// ✅ التصدير الصحيح
module.exports = homeBanner;
