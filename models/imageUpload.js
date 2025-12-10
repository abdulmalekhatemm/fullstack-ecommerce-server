const mongoose = require('mongoose');

const imageUploadSchema = new mongoose.Schema({
  images: [
    {
      type: String,
      required: true, // ✅ بدل require: true
    },
  ],
});

// إنشاء حقل افتراضي id
imageUploadSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// السماح بإظهار الحقول الافتراضية عند تحويل البيانات إلى JSON
imageUploadSchema.set('toJSON', {
  virtuals: true,
});

// ✅ التصدير الصحيح للموديل
module.exports = mongoose.model('ImageUpload', imageUploadSchema);
