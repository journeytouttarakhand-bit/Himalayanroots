import mongoose, { Schema, models, model } from "mongoose";

const OrderSchema = new Schema(
  {
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: String,
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      notes: String,
    },

    items: [
      {
        id: Number,
        slug: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentId: String,
    orderId: String,

    paymentStatus: {
      type: String,
      default: "Paid",
    },

    orderStatus: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Order || model("Order", OrderSchema);