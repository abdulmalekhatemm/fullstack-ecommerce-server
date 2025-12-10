const mongoose = require("mongoose");

const userSchame = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true, // ✅ بدل require: true
    },
  ],
  isAdmin:
  {
    type:Boolean ,
    default: false 
  }
});

userSchame.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchame.set("toJSON", {
  virtuals: true, // ✅ لاحظ هنا virtuals وليس virtual
});


// ✅ إنشاء الموديل
const User = mongoose.model("User", userSchame);

// ✅ التصدير الصحيح
module.exports = User;