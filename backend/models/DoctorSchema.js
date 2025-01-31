import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  photo: {
    type: String
  },
  fees: {
    type: Number
  },
  role: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required:true
  },

  // Fields for doctors only
  specialization: {
    type: String
  },
  qualifications: {
    type: Array,
  },

  experiences: {
    type: Array,
  },

  bio: {
    type: String,
  },
  about: {
    type: String
  },
  timeSlots: {
    type: Array
  },
  reviews: [{
    type: mongoose.Types.ObjectId,
    ref: "Review"
  }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  bookings: [{
    type: mongoose.Types.ObjectId,
    ref: "Booking"
  }],
});

export default mongoose.model("Doctor", DoctorSchema);