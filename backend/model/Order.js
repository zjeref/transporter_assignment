const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderSchema);
