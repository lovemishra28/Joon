import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Order Placed" },
  payment: { type: String },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
