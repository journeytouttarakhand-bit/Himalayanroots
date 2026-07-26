import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const ReviewSchema = new Schema(
  {
    // ===========================
    // User
    // ===========================

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ===========================
    // Product
    // ===========================

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // ===========================
    // Rating
    // ===========================

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // ===========================
    // Review
    // ===========================

    title: {
      type: String,
      default: "",
      trim: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    // ===========================
    // Images
    // ===========================

    images: {
      type: [String],
      default: [],
    },

    // ===========================
    // Verified Purchase
    // ===========================

    verifiedPurchase: {
      type: Boolean,
      default: false,
    },

    // ===========================
    // Helpful Count
    // ===========================

    helpful: {
      type: Number,
      default: 0,
    },

    // ===========================
    // Admin Approval
    // ===========================

    approved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review =
  models.Review ||
  model(
    "Review",
    ReviewSchema
  );

export default Review;