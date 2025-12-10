// models/productSize.js
const mongoose = require('mongoose');

const productSizeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
});

productSizeSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

productSizeSchema.set('toJSON', {
  virtuals: true, // ✅ يجب أن تكون virtuals وليس virtual
});

// ✅ التصدير الصحيح
module.exports = mongoose.model('ProductSize', productSizeSchema);
