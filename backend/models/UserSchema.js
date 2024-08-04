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
  gender: {
    type: String,
    enum: ["male", "female"],
    required:true
  },
  role: {
    type: String,
  },
  bookings: [{
    type: mongoose.Types.ObjectId,
    ref: "Booking"
  }],
});

export default mongoose.model("User", UserSchema);