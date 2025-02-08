import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    tours: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tour",
      },
    ],
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

export default mongoose.model("Guide", guideSchema);
