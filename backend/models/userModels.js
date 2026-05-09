import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    role: {
      type: String,
      enum: ["ADMIN", "STUDENT"],
      default: "STUDENT"
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    avatar: {
      type: String,
      default: ""
    },

    phone: {
      type: String
    },
    refreshToken: {
      type: String
    },
    isSubscribed: {
    type: Boolean,
    default: false
  },

  subscriptionPlan: {
    type: String, // monthly / yearly
    default: null
  },

  subscriptionExpires: {
    type: Date
  }

    // subscription: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Subscription"
    // }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);