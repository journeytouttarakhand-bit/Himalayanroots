import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const CouponSchema = new Schema(
  {
    //----------------------------------
    // Coupon Code
    //----------------------------------

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    //----------------------------------
    // Discount
    //----------------------------------

    discountType: {
      type: String,
      enum: [
        "percentage",
        "fixed",
      ],
      default: "percentage",
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },

    //----------------------------------
    // Order Rules
    //----------------------------------

    minimumOrder: {
      type: Number,
      default: 0,
      min: 0,
    },

    maximumDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },

    //----------------------------------
    // Usage
    //----------------------------------

    usageLimit: {
      type: Number,
      default: 0,
      min: 0,
    },

    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    //----------------------------------
    // Validity
    //----------------------------------

    expiryDate: {
      type: Date,
      required: true,
    },

    //----------------------------------
    // Status
    //----------------------------------

    active: {
      type: Boolean,
      default: true,
    },

    //----------------------------------
    // Optional
    //----------------------------------

    description: {
      type: String,
      default: "",
      trim: true,
    },

    createdBy: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

CouponSchema.pre("save", function () {
  if (this.code) {
    this.code = this.code.toUpperCase();
  }
});
export interface ICoupon
  extends mongoose.Document {
  code: string;

  discountType:
    | "percentage"
    | "fixed";

  discountValue: number;

  minimumOrder: number;

  maximumDiscount: number;

  usageLimit: number;

  usedCount: number;

  expiryDate: Date;

  active: boolean;

  description: string;

  createdBy: string;

  createdAt: Date;

  updatedAt: Date;
}

const Coupon =
  models.Coupon ||
  model<ICoupon>(
    "Coupon",
    CouponSchema
  );

export default Coupon;