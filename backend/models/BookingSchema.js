import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fees: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "done", "cancelled"],
    default: "pending",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  session:{
    type:String
  }
}, {
  timestamps: true
});

export default mongoose.model("Booking", BookingSchema);