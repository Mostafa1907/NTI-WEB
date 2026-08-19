const mongoose = require("mongoose");
const bcrypt = require ("bcryptjs") 
const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [5, "First name must be at least 2 characters long"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },

    role: {
      type: String,
      enum: {
        values: ["customer", "admin"],
        message: "Role must be customer, or admin",
      },
      default: "customer",
    },

    phone: {
      type: String,
      trim: true,
      match: [/^\+?[0-9]{10,15}$/, "Please provide a valid phone number"],
    },

    imageUrl: {
      type: String,
      trim: true,
      default: "image.png",
    },

    myProducts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;