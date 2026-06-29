const mongoose = require("mongoose");

const customOrderSchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: String,
    },

    productType: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    color: String,

    notes: String,

    logoFile: String,

    artworkFile: String,

    status: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Reviewing",
        "Approved",
        "Rejected",
        "Completed",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CustomOrder", customOrderSchema);