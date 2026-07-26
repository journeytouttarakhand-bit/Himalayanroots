import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

export interface IUser
  extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  password: string;

  avatar: string;

  role: "customer" | "admin";

  isVerified: boolean;

  addresses: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
    isDefault: boolean;
  }[];

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    //----------------------------------
    // Basic Details
    //----------------------------------

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    //----------------------------------
    // Role
    //----------------------------------

    role: {
      type: String,
      enum: [
        "customer",
        "admin",
      ],
      default: "customer",
    },

    //----------------------------------
    // Verification
    //----------------------------------

    isVerified: {
      type: Boolean,
      default: true,
    },

    //----------------------------------
    // Addresses
    //----------------------------------

    addresses: [
      {
        fullName: {
          type: String,
          default: "",
        },

        phone: {
          type: String,
          default: "",
        },

        address: {
          type: String,
          default: "",
        },

        city: {
          type: String,
          default: "",
        },

        state: {
          type: String,
          default: "",
        },

        pincode: {
          type: String,
          default: "",
        },

        landmark: {
          type: String,
          default: "",
        },

        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User =
  models.User ||
  model<IUser>(
    "User",
    UserSchema
  );

export default User;