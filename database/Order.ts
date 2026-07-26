import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const OrderSchema = new Schema(
  {
    // ======================================
    // Logged In User (Optional for guest orders)
    // ======================================

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      sparse: true,
    },

    // ======================================
    // Customer Details
    // ======================================

    customer: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },

      notes: {
        type: String,
        default: "",
      },
    },

    // ======================================
    // Products
    // ======================================

    items: [
      {
        id: String,

        slug: String,

        name: String,

        price: Number,

        quantity: Number,

        image: String,
      },
    ],

    // ======================================
    // Amounts
    // ======================================

    totalAmount: {
      type: Number,
      required: true,
    },

    originalAmount: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    finalAmount: {
      type: Number,
      default: 0,
    },

    couponCode: {
      type: String,
      default: "",
    },

    // ======================================
    // Razorpay
    // ======================================

    paymentId: {
      type: String,
      default: "",
    },

    orderId: {
      type: String,
      default: "",
    },

    // ======================================
    // Status
    // ======================================

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
        "Refunded",
      ],
      default: "Paid",
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Packed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order =
  models.Order ||
  model("Order", OrderSchema);

export default Order;