const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
    },
    shippingAddress: {
      street: String,
      city: String,
      province: String,
      postalCode: String,
      country: String,
    },
    items: [
      {
        _id: String,
        name: String,
        price: Number,
        image: String,
        quantity: Number,
      },
    ],
    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number,
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    orderStatus: {
      type: String,
      default: "Processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);