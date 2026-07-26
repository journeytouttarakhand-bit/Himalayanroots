import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const AddressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    landmark: {
      type: String,
      default: "",
      trim: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export interface IAddress
  extends mongoose.Document {
  user: string;

  fullName: string;

  phone: string;

  address: string;

  city: string;

  state: string;

  pincode: string;

  landmark: string;

  isDefault: boolean;
}

const Address =
  models.Address ||
  model<IAddress>(
    "Address",
    AddressSchema
  );

export default Address;