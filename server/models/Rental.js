import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      enum: ["Economy", "Standard", "Luxury", "SUV", "Van"],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rental", rentalSchema);
