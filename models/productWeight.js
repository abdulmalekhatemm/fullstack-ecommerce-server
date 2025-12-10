const mongoose = require('mongoose');

const productWeightSchema = new mongoose.Schema({
 productWeight: {
    type: String,
    required: true,
  },
});

productWeightSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

productWeightSchema.set('toJSON', {
  virtuals: true, // ✅ لاحظ هنا virtuals وليس virtual
});

// ✅ التصدير الصحيح
module.exports = mongoose.model('ProductWeight', productWeightSchema);
