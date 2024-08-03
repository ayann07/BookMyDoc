import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    type: String,
    default:null
  },
  role: {
    type: String,
    enum: ["patient", "admin"],
    required:true
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required:true
  },

  bloodGroup: {
    type: String
  },
  bookings: [{
    type: mongoose.Types.ObjectId,
    ref: "Booking"
  }],
});

export default mongoose.model("User", UserSchema);