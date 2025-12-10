const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
      },
      productName: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
      image: {
        type: String,
      },
      subTotal: {
        type: Number
      },
    },
  ],
  status: {
    type: String,
    default: "pincode",
  },
  data: {
    type: Date,
    required: Date.now,
  },
});

ordersSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
ordersSchema.set("toJSON", {
  virtual: true,
});
// exports.Category = mongoose.model('Category', categorySchema);

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;

//   images: {
//   type: [String],
//   required: true,
//   validate: {
//     validator: function (arr) {
//       return arr.length > 0;
//     },
//     message: 'At least one image is required.'
//   }
// }
